import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router';

import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from '../data/site';

export function Layout() {
  return (
    <>
      <header>
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            {SITE_NAME}
          </Link>
          <nav className="navbar-links" aria-label="Main">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink key={to} to={to} end>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <nav className="social-links" aria-label="Social media">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => {
            const external = href.startsWith('http');
            return (
              <a
                key={label}
                href={href}
                title={label}
                aria-label={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </nav>
      </header>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
