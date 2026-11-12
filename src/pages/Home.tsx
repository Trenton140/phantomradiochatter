import { useState } from 'react';

import { Lightbox } from '../components/Lightbox';
import { Page } from '../components/Page';
import { PhotoButton } from '../components/PhotoButton';
import { GROUP_PHOTO, LOCATION, SITE_NAME } from '../data/site';

export function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <Page title={SITE_NAME}>
      <PhotoButton
        photo={GROUP_PHOTO}
        className="framed-photo"
        eager
        onClick={() => setLightboxOpen(true)}
      />
      <p>Welcome to the official band website!</p>
      <p className="location">{LOCATION}</p>
      {lightboxOpen && (
        <Lightbox
          photos={[GROUP_PHOTO]}
          caption={SITE_NAME}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </Page>
  );
}
