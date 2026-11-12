import type { IconType } from 'react-icons';
import { FaEnvelope, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

import groupPhoto from '../assets/photos/group.jpg';
import markPhoto from '../assets/photos/mark-duch-koetsier.jpg';
import michaelPhoto from '../assets/photos/michael-bennett-leroux.jpg';
import owenPhoto from '../assets/photos/owen-mclaughlin.jpg';

export const SITE_NAME = 'Phantom Radio Chatter';
export const LOCATION = 'Toronto, Ontario, Canada';
export const YOUTUBE_URL = 'https://www.youtube.com/@PhantomRadioChatter';

export interface Photo {
  src: string;
  alt: string;
  /** Intrinsic size, so the browser can reserve space before the file loads. */
  width: number;
  height: number;
}

const photo = (src: string, alt: string): Photo => ({ src, alt, width: 2048, height: 1152 });

export const GROUP_PHOTO = photo(groupPhoto, SITE_NAME);

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
    photo: photo(michaelPhoto, 'Michael Bennett Leroux'),
  },
  {
    name: 'Owen McLaughlin',
    role: 'Bass Guitar',
    bio: 'A short writeup about Owen McLaughlin. Loves groovy bass lines and live shows.',
    photo: photo(owenPhoto, 'Owen McLaughlin'),
  },
  {
    name: 'Mark Duch Koetsier',
    role: 'Drums',
    bio: 'A short writeup about Mark Duch Koetsier. Keeps the beat and brings the energy.',
    photo: photo(markPhoto, 'Mark Duch Koetsier'),
  },
];

/** Photos page gallery, in display order. */
export const GALLERY: readonly Photo[] = [
  GROUP_PHOTO,
  photo(markPhoto, 'Mark Duch Koetsier'),
  photo(michaelPhoto, 'Michael Bennett Leroux'),
  photo(owenPhoto, 'Owen McLaughlin'),
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
