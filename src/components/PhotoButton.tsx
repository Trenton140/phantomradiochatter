import type { Photo } from '../data/site';

interface PhotoButtonProps {
  photo: Photo;
  className: string;
  /** Skip lazy loading for photos visible on first paint. */
  eager?: boolean;
  onClick: () => void;
}

/** A photo that opens in the lightbox when activated by mouse, touch or keyboard. */
export function PhotoButton({ photo, className, eager = false, onClick }: PhotoButtonProps) {
  return (
    <button
      type="button"
      className={`photo-button ${className}`}
      aria-label={`View photo: ${photo.alt}`}
      onClick={onClick}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </button>
  );
}
