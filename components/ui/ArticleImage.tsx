"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function ArticleImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  // If image is missing or failed to load
  if (!src || src.trim() === "" || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <Image
          src="/logo.svg"
          alt="Gondia Today"
          width={140}
          height={140}
          className="object-contain opacity-80 p-4"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}