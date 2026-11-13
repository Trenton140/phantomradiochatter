import { useEffect, useRef } from 'react';

import { BANDSINTOWN_ARTIST_ID } from '../data/site';

const WIDGET_SCRIPT_URL = 'https://widgetv3.bandsintown.com/main.min.js';

/**
 * Options for the Bandsintown widget, set as `data-*` attributes on its
 * placeholder link. Colours mirror the variables in index.css.
 * Reference: https://artists.bandsintown.com/support/widget-installation
 */
const WIDGET_OPTIONS: Record<string, string> = {
  'artist-name': `id_${BANDSINTOWN_ARTIST_ID}`,
  language: 'en',
  'auto-style': 'false',
  font: 'Oswald Variable, Arial, sans-serif',
  'background-color': '#ffffff',
  'text-color': '#222222',
  'separator-color': '#dddddd',
  'link-color': '#b30000',
  'link-text-color': '#ffffff',
  'display-limit': 'all',
  'display-local-dates': 'false',
  'display-past-dates': 'true',
  'display-lineup': 'true',
  'display-start-time': 'true',
  'display-play-my-city': 'true',
};

/**
 * The band's tour dates, pulled live from Bandsintown. Shows are managed in
 * Bandsintown for Artists and appear here without any change to the site.
 */
export function BandsintownWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The widget script rewrites the DOM around its placeholder, so the
  // placeholder is created by hand inside a container React leaves alone.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const placeholder = document.createElement('a');
    placeholder.className = 'bit-widget-initializer';
    for (const [name, value] of Object.entries(WIDGET_OPTIONS)) {
      placeholder.setAttribute(`data-${name}`, value);
    }
    container.append(placeholder);

    // Loaded fresh on each visit to the page: the script only looks for
    // placeholders at the moment it runs.
    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    document.body.append(script);

    return () => {
      script.remove();
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="tour-widget" />;
}
