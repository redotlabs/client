import {
  useState,
  useEffect,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { cn } from '@redotlabs/utils';

interface Props extends ComponentProps<'img'> {
  fallback?: ReactNode;
  isFallback?: boolean;
  fallbackClassName?: string;
  containerClassName?: string;
}

function Image({
  src,
  alt,
  width,
  height,
  fallback,
  className = '',
  fallbackClassName = '',
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    setIsError(false);
  }, [src]);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10">
          {fallback ?? (
            <div
              className={cn(
                'w-full h-full bg-gray-100 animate-pulse',
                fallbackClassName
              )}
            />
          )}
        </div>
      )}
      {!src || isError ? (
        <div className="absolute inset-0 z-10">
          {fallback ?? (
            <div
              className={cn('w-full h-full bg-gray-300', fallbackClassName)}
            />
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          onError={onError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}

export default Image;
