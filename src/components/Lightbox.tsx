import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, WheelEvent } from 'react';

import type { Photo } from '../data/site';

/** Must match the opacity transition on `.lightbox-photo`. */
const FADE_MS = 250;
const ARROW_IDLE_MS = 1000;

interface LightboxProps {
  photos: readonly Photo[];
  initialIndex?: number;
  /** Shown under the photo. */
  caption?: string;
  onClose: () => void;
}

/**
 * Full-screen photo viewer built on a native modal <dialog>, which provides
 * the focus trap, Escape-to-close and focus restoration. With more than one
 * photo it also shows previous/next arrows and responds to the arrow keys and
 * the mouse wheel.
 */
export function Lightbox({ photos, initialIndex = 0, caption, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const fadeTimer = useRef<number | undefined>(undefined);
  const idleTimer = useRef<number | undefined>(undefined);

  const [index, setIndex] = useState(initialIndex);
  const [fading, setFading] = useState(false);
  const [idle, setIdle] = useState(false);

  const photo = photos[index];
  const hasMultiple = photos.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    // Guarded because StrictMode runs effects twice in development.
    if (dialog && !dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();
    return () => {
      window.clearTimeout(fadeTimer.current);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  // Closing always goes through the dialog so every path (button, backdrop,
  // Escape) fires the same `close` event and returns focus to the opener.
  const close = () => dialogRef.current?.close();

  const step = (delta: number) => {
    if (!hasMultiple || fadeTimer.current !== undefined) return;
    setFading(true);
    fadeTimer.current = window.setTimeout(() => {
      fadeTimer.current = undefined;
      setIndex((current) => (current + delta + photos.length) % photos.length);
      setFading(false);
    }, FADE_MS);
  };

  /** Show the arrows, then hide them again once the pointer and keys go quiet. */
  const wake = () => {
    if (!hasMultiple) return;
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), ARROW_IDLE_MS);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    wake();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  };

  const handleWheel = (event: WheelEvent) => {
    wake();
    if (event.deltaY !== 0) step(event.deltaY < 0 ? -1 : 1);
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) close();
  };

  if (!photo) return null;

  return (
    // The dialog itself is the dimmed backdrop; keyboard users close with Escape or the Close button.
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={caption ?? photo.alt}
      onClose={onClose}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onMouseMove={wake}
    >
      <div className="lightbox-content">
        <div className={idle ? 'lightbox-stage is-idle' : 'lightbox-stage'}>
          {hasMultiple && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow--prev"
              aria-label="Previous photo"
              onClick={() => step(-1)}
            >
              &lt;
            </button>
          )}
          <img
            className={fading ? 'lightbox-photo is-fading' : 'lightbox-photo'}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
          {hasMultiple && (
            <button
              type="button"
              className="lightbox-arrow lightbox-arrow--next"
              aria-label="Next photo"
              onClick={() => step(1)}
            >
              &gt;
            </button>
          )}
        </div>
        {caption && <p className="lightbox-caption">{caption}</p>}
        <button ref={closeButtonRef} type="button" className="lightbox-close" onClick={close}>
          Close
        </button>
      </div>
    </dialog>
  );
}
