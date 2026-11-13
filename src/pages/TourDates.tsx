import { BandsintownWidget } from '../components/BandsintownWidget';
import { Page } from '../components/Page';
import { BANDSINTOWN_URL } from '../data/site';

export function TourDates() {
  return (
    <Page title="Tour Dates">
      <BandsintownWidget />
      <p>
        <a href={BANDSINTOWN_URL} target="_blank" rel="noopener noreferrer">
          See all shows on Bandsintown
        </a>
      </p>
    </Page>
  );
}
