import { Page } from '../components/Page';
import { YOUTUBE_URL } from '../data/site';

export function Watch() {
  return (
    <Page title="Watch">
      <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
        YouTube Channel
      </a>
    </Page>
  );
}
