import { expect, test } from '@playwright/experimental-ct-react';
import Icon from './Icon';

test.use({ viewport: { width: 500, height: 500 } });

const props = {
  src: 'src',
  title: 'title',
}

test('should work', async ({ mount }) => {
  const component = await mount(<Icon src={props.src} title={props.title} />);
  await expect(component).toHaveAttribute('src', 'src');
  await expect(component).toHaveAttribute('title', props.title);
});