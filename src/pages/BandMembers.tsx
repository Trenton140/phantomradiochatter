import { useState } from 'react';

import { Lightbox } from '../components/Lightbox';
import { Page } from '../components/Page';
import { PhotoButton } from '../components/PhotoButton';
import { BAND_MEMBERS, FRAMED_PHOTO_SIZES } from '../data/site';
import type { BandMember } from '../data/site';

export function BandMembers() {
  const [selected, setSelected] = useState<BandMember | null>(null);

  return (
    <Page title="Band Members">
      <div className="members">
        {BAND_MEMBERS.map((member, index) => (
          <article key={member.name} className="member">
            <PhotoButton
              photo={member.photo}
              className="framed-photo"
              sizes={FRAMED_PHOTO_SIZES}
              eager={index === 0}
              onClick={() => setSelected(member)}
            />
            <h2 className="member-name">{member.name}</h2>
            <strong>{member.role}</strong>
            <p>{member.bio}</p>
          </article>
        ))}
      </div>
      {selected && (
        <Lightbox
          photos={[selected.photo]}
          caption={selected.name}
          onClose={() => setSelected(null)}
        />
      )}
    </Page>
  );
}
