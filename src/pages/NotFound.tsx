import { Link } from 'react-router';

import { Page } from '../components/Page';

export function NotFound() {
  return (
    <Page title="Page Not Found">
      <p>
        Sorry, that page doesn&rsquo;t exist. <Link to="/">Back to the home page</Link>.
      </p>
    </Page>
  );
}
