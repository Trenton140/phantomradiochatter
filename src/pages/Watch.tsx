import { Page } from '../components/Page';
import { YOUTUBE_PLAYLIST_ID, YOUTUBE_URL } from '../data/site';

export function Watch() {
  return (
    <Page title="Watch">
      <iframe
        className="video-embed"
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
        title="Phantom Radio Chatter videos on YouTube"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <p>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
          YouTube Channel
        </a>
      </p>
    </Page>
  );
}
