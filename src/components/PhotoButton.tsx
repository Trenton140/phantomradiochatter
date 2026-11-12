import type { Photo } from '../data/site';

interface PhotoButtonProps {
  photo: Photo;
  className: string;
  /** How wide the photo is displayed, so the browser can pick the smallest file that fits. */
  sizes: string;
  /** Skip lazy loading for photos visible on first paint. */
  eager?: boolean;
  onClick: () => void;
}

/** A photo that opens in the lightbox when activated by mouse, touch or keyboard. */
export function PhotoButton({ photo, className, sizes, eager = false, onClick }: PhotoButtonProps) {
  return (
    <button
      type="button"
      className={`photo-button ${className}`}
      aria-label={`View photo: ${photo.alt}`}
      onClick={onClick}
    >
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </button>
  );
}
