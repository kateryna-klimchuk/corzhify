import { useState } from "react";
import { Icon } from "~/components/Icon/Icon";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const ImageWithFallback: React.FunctionComponent<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  fallbackClassName = "",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${fallbackClassName || className}`}
      >
        <div className="text-center text-gray-400">
          <Icon.EmptyState className="w-16 h-16 mx-auto mb-2" strokeWidth="0.5" />
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse ${className}`}
        >
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};
