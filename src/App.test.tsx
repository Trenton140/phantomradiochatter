import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { BAND_MEMBERS, GALLERY, NAV_ITEMS } from './data/site';
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

  it('lists every band member', () => {
    renderAt('/band-members');

    for (const { name, role } of BAND_MEMBERS) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeVisible();
      expect(screen.getByText(role)).toBeVisible();
    }
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
});
