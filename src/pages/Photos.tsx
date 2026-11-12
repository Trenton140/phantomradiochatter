import { useState } from 'react';

import { Lightbox } from '../components/Lightbox';
import { Page } from '../components/Page';
import { PhotoButton } from '../components/PhotoButton';
import { GALLERY } from '../data/site';

export function Photos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Page title="Photos">
      <div className="photos-grid">
        {GALLERY.map((photo, index) => (
          <PhotoButton
            key={photo.src}
            photo={photo}
            className="photo-item"
            sizes="(max-width: 600px) 80vw, 330px"
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox photos={GALLERY} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </Page>
  );
}
