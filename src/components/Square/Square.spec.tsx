import { expect, test } from '@playwright/experimental-ct-react';
import Square from './Square';

test.describe('Square', () => {

  test('should show the X icon without regression', async ({ mount, page }) => {
    await mount(<Square value={'X'} onSelect={() => { }} />);
    await expect(page).toHaveScreenshot();
  });

  test('should show the O icon without regression', async ({ mount, page }) => {
    await mount(<Square value={'O'} onSelect={() => { }} />);
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });

  test('should show None icon without regression', async ({ mount, page }) => {
    await mount(<Square value={null} onSelect={() => { }} />);
    await expect(page).toHaveScreenshot();
  });

})