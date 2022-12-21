import { expect, test } from '@playwright/experimental-ct-react';
import { TicTacToeGrid } from '../../models/TicTacToeGrid';
import Board from './Board';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const board: TicTacToeGrid = [null, null, null, null, null, null, null, null, null];
  const component = await mount(<Board board={board} move={(i) => { }} />);
  const squares = component.getByRole('button');
  expect(await squares.count()).toBe(9);
});