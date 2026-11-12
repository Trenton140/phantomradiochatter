import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { SITE_NAME } from '../data/site';

interface PageProps {
  /** Page heading; also used for the browser tab title. */
  title: string;
  children: ReactNode;
}

/** The white content card every page is rendered in. */
export function Page({ title, children }: PageProps) {
  const isHome = title === SITE_NAME;

  useEffect(() => {
    document.title = isHome ? SITE_NAME : `${title} | ${SITE_NAME}`;
  }, [title, isHome]);

  return (
    <main className="page">
      <h1 className={isHome ? 'page-title page-title--home' : 'page-title'}>{title}</h1>
      {children}
    </main>
  );
}
