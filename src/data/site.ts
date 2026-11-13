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
/** The playlist embedded on the Watch page. */
export const YOUTUBE_PLAYLIST_ID = 'PLsKAr2oWG0-gCmpVh65V7FEhCfOl4yS9I';

/** The band's Bandsintown artist page, the source of the Tour Dates page. */
export const BANDSINTOWN_ARTIST_ID = '15608715';
export const BANDSINTOWN_URL = `https://www.bandsintown.com/a/${BANDSINTOWN_ARTIST_ID}-phantom-radio-chatter`;

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

export const GROUP_PHOTO = photo(groupPhoto, groupSrcSet, SITE_NAME);

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
  { to: '/tour-dates', label: 'Tour Dates' },
  { to: '/watch', label: 'Watch' },
  { to: '/listen', label: 'Listen' },
  { to: '/photos', label: 'Photos' },
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
