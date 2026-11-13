import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { GALLERY, NAV_ITEMS } from './data/site';
import { routes } from './routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe('site', () => {
  it('renders the home page with navigation and social links', () => {
    renderAt('/');

    expect(screen.getByRole('heading', { level: 1, name: 'Phantom Radio Chatter' })).toBeVisible();
    expect(screen.getByText('Toronto, Ontario, Canada')).toBeVisible();

    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const { label } of NAV_ITEMS) {
      expect(within(nav).getByRole('link', { name: label })).toBeVisible();
    }
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/phantomradiochatterband/',
    );
  });

  it('navigates between pages and updates the document title', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await user.click(screen.getByRole('link', { name: 'Tour Dates' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Tour Dates' })).toBeVisible();
    expect(document.title).toBe('Tour Dates | Phantom Radio Chatter');
  });

  it('only links to the pages that exist', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(
      within(nav)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(['Home', 'Tour Dates', 'Watch', 'Listen', 'Photos']);
  });

  it('shows the Bandsintown widget on the tour dates page', () => {
    renderAt('/tour-dates');

    const placeholder = document.querySelector('.bit-widget-initializer');
    expect(placeholder).toHaveAttribute('data-artist-name', 'id_15608715');
    expect(document.querySelector('script[src*="bandsintown.com"]')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'See all shows on Bandsintown' })).toHaveAttribute(
      'href',
      'https://www.bandsintown.com/a/15608715-phantom-radio-chatter',
    );
  });

  it('embeds the YouTube playlist on the watch page', () => {
    renderAt('/watch');

    expect(screen.getByTitle('Phantom Radio Chatter videos on YouTube')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/videoseries?list=PLsKAr2oWG0-gCmpVh65V7FEhCfOl4yS9I',
    );
  });

  it('shows a not-found page for unknown URLs', () => {
    renderAt('/nope');

    expect(screen.getByRole('heading', { level: 1, name: 'Page Not Found' })).toBeVisible();
  });
});

describe('photo lightbox', () => {
  it('opens from the gallery, steps through photos and closes', async () => {
    const user = userEvent.setup();
    renderAt('/photos');

    const [first, second] = GALLERY;
    await user.click(screen.getByRole('button', { name: `View photo: ${first!.alt}` }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', first!.src);

    await user.click(within(dialog).getByRole('button', { name: 'Next photo' }));
    expect(await within(dialog).findByRole('img', { name: second!.alt })).toBeVisible();

    await user.click(within(dialog).getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('changes photo on a sideways swipe but not on a vertical one', async () => {
    const user = userEvent.setup();
    renderAt('/photos');

    const [first, second] = GALLERY;
    await user.click(screen.getByRole('button', { name: `View photo: ${first!.alt}` }));
    const dialog = screen.getByRole('dialog');

    fireEvent.touchStart(dialog, { touches: [{ clientX: 200, clientY: 300 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 210, clientY: 100 }] });
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(within(dialog).getByRole('img')).toHaveAccessibleName(first!.alt);

    fireEvent.touchStart(dialog, { touches: [{ clientX: 300, clientY: 300 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 100, clientY: 310 }] });
    expect(await within(dialog).findByRole('img', { name: second!.alt })).toBeVisible();
  });
});
