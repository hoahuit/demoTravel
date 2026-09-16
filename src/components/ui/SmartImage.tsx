import React, { useState, useEffect } from 'react';

export interface SmartImageProps {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: '16-9' | '4-3' | '1-1' | '3-4' | 'full' | 'auto';
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  aspectRatio = 'auto',
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  fallbackSrc,
  onLoad,
  onError,
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
  }, [src]);

  const handleImageLoaded = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setIsLoaded(true); // Stop skeleton loop on hard failure
    }
    if (onError) onError();
  };

  const aspectClass =
    aspectRatio === '16-9'
      ? 'smart-img-aspect-16-9'
      : aspectRatio === '4-3'
      ? 'smart-img-aspect-4-3'
      : aspectRatio === '1-1'
      ? 'smart-img-aspect-1-1'
      : aspectRatio === '3-4'
      ? 'smart-img-aspect-3-4'
      : aspectRatio === 'full'
      ? 'smart-img-aspect-full'
      : '';

  return (
    <div className={`smart-img-root ${aspectClass} ${className}`}>
      {/* Shimmer Skeleton Placeholder (Always present until real image is loaded) */}
      <div
        className={`smart-img-skeleton ${isLoaded ? 'is-hidden' : ''}`}
        aria-hidden="true"
      />

      {/* Real Image Element with smooth fade-in */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding={decoding}
          // @ts-ignore - React 18 fetchpriority support
          fetchpriority={fetchPriority}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          className={`smart-img-tag ${isLoaded ? 'is-loaded' : ''} ${imgClassName}`}
        />
      )}
    </div>
  );
}
