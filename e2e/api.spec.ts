import { expect, test } from "@playwright/test";
import { ChildProcess, exec } from "child_process";
import { randomUUID } from "crypto";
import { copyFile, unlink } from "fs/promises";
import { join } from "path";

const dbName = `db_test_${randomUUID()}.json`;

const dbInitPath = join(process.cwd(), "db", "db_test.json");
const dbPath = join(process.cwd(), "db", dbName);
const portsMapping = {
  chromium: 3001,
  firefox: 3002,
  webkit: 3003,
} as const;
let port: 3001 | 3002 | 3003;
let baseUrl: string;
let api_process: ChildProcess;

test.beforeAll(async ({ browserName }) => {
  port = portsMapping[browserName];
  baseUrl = `http://localhost:${port}/api`;
  // Create a file to be uploaded
  await copyFile(dbInitPath, dbPath);

  // Start the server
  await new Promise<void>((resolve, reject) => {
    api_process = exec(
      `npx json-server-auth --watch ${dbPath} --port ${port} --routes db/routes_test.json`,
      err => {
        if (err) reject(err);
      }
    );

    api_process.stdout?.on("data", data => {
      if (data.includes("Watching...")) {
        setTimeout(() => {
          resolve();
        }, 10);
      }
    });
  });
});

test.afterAll(async () => {
  console.log("Kill server", baseUrl);
  api_process.kill();
  await unlink(dbPath);
});

test("should insert a winner", async ({ request }) => {
  console.log("Testing the server", baseUrl);
  const loginResult = await request.post(`${baseUrl}/login`, {
    data: {
      email: "test@test.it",
      password: "test",
    },
  });
  expect(loginResult.ok()).toBeTruthy();
  const { accessToken } = await loginResult.json();
  const result = await request.post(`${baseUrl}/winners`, {
    data: {
      winner: "O",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  expect(result.ok()).toBeTruthy();
  expect(await result.json()).toEqual(
    expect.objectContaining({
      winner: "O",
      id: expect.any(Number),
    })
  );
});

test("should return an array of winner", async ({ request }) => {
  const result = await request.get(`${baseUrl}/winners`);
  expect(result.ok()).toBeTruthy();
  expect(await result.json()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        winner: expect.stringMatching(/^O|X$/),
        id: expect.any(Number),
      }),
    ])
  );
});
