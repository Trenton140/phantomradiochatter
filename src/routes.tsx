import type { RouteObject } from 'react-router';

import { Layout } from './components/Layout';
import { BandMembers } from './pages/BandMembers';
import { Blog } from './pages/Blog';
import { Home } from './pages/Home';
import { Listen } from './pages/Listen';
import { NotFound } from './pages/NotFound';
import { Photos } from './pages/Photos';
import { TourDates } from './pages/TourDates';
import { Watch } from './pages/Watch';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'band-members', element: <BandMembers /> },
      { path: 'tour-dates', element: <TourDates /> },
      { path: 'watch', element: <Watch /> },
      { path: 'listen', element: <Listen /> },
      { path: 'photos', element: <Photos /> },
      { path: 'blog', element: <Blog /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
