import type { IconType } from 'react-icons';
import { FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

// Each photo is imported twice: the original JPEG as a fallback, and a set of
// smaller WebP versions (generated at build time by vite-imagetools) so phones
// don't have to download the full 2048px file.
import groupPhoto from '../assets/photos/group.jpg';
import groupSrcSet from '../assets/photos/group.jpg?w=480;800;1200;1600&format=webp&as=srcset';
import markPhoto from '../assets/photos/mark-duch-koetsier.jpg';
import markSrcSet from '../assets/photos/mark-duch-koetsier.jpg?w=480;800;1200;1600&format=webp&as=srcset';
import michaelPhoto from '../assets/photos/michael-bennett-leroux.jpg';
import michaelSrcSet from '../assets/photos/michael-bennett-leroux.jpg?w=480;800;1200;1600&format=webp&as=srcset';
import owenPhoto from '../assets/photos/owen-mclaughlin.jpg';
import owenSrcSet from '../assets/photos/owen-mclaughlin.jpg?w=480;800;1200;1600&format=webp&as=srcset';

export const SITE_NAME = 'Phantom Radio Chatter';
export const LOCATION = 'Toronto, Ontario, Canada';
export const YOUTUBE_URL = 'https://www.youtube.com/@PhantomRadioChatter';

export interface Photo {
  src: string;
  /** Smaller versions of the same photo for the browser to choose from. */
  srcSet: string;
  alt: string;
  /** Intrinsic size, so the browser can reserve space before the file loads. */
  width: number;
  height: number;
}

const photo = (src: string, srcSet: string, alt: string): Photo => ({
  src,
  srcSet,
  alt,
  width: 2048,
  height: 1152,
});

/** Display width of the large framed photos: full width on phones, 700px otherwise. */
export const FRAMED_PHOTO_SIZES = '(max-width: 600px) calc(100vw - 4em), 700px';

export const GROUP_PHOTO = photo(groupPhoto, groupSrcSet, SITE_NAME);

export interface BandMember {
  name: string;
  role: string;
  bio: string;
  photo: Photo;
}

export const BAND_MEMBERS: readonly BandMember[] = [
  {
    name: 'Michael Bennett Leroux',
    role: 'Vocals & Guitar',
    bio: 'A short writeup about Michael Bennett Leroux. Passionate about music and the band.',
    photo: photo(michaelPhoto, michaelSrcSet, 'Michael Bennett Leroux'),
  },
  {
    name: 'Owen McLaughlin',
    role: 'Bass Guitar',
    bio: 'A short writeup about Owen McLaughlin. Loves groovy bass lines and live shows.',
    photo: photo(owenPhoto, owenSrcSet, 'Owen McLaughlin'),
  },
  {
    name: 'Mark Duch Koetsier',
    role: 'Drums',
    bio: 'A short writeup about Mark Duch Koetsier. Keeps the beat and brings the energy.',
    photo: photo(markPhoto, markSrcSet, 'Mark Duch Koetsier'),
  },
];

/** Photos page gallery, in display order. */
export const GALLERY: readonly Photo[] = [
  GROUP_PHOTO,
  photo(markPhoto, markSrcSet, 'Mark Duch Koetsier'),
  photo(michaelPhoto, michaelSrcSet, 'Michael Bennett Leroux'),
  photo(owenPhoto, owenSrcSet, 'Owen McLaughlin'),
];

export interface NavItem {
  to: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/band-members', label: 'Band Members' },
  { to: '/tour-dates', label: 'Tour Dates' },
  { to: '/watch', label: 'Watch' },
  { to: '/listen', label: 'Listen' },
  { to: '/photos', label: 'Photos' },
  { to: '/blog', label: 'Blog' },
];

export interface SocialLink {
  href: string;
  label: string;
  Icon: IconType;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: 'https://www.facebook.com/profile.php?id=61578310437399',
    label: 'Facebook',
    Icon: FaFacebook,
  },
  {
    href: 'https://www.instagram.com/phantomradiochatterband/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
  { href: YOUTUBE_URL, label: 'YouTube', Icon: FaYoutube },
  { href: 'mailto:phantomradiochatter@gmail.com', label: 'Email', Icon: FaEnvelope },
];
