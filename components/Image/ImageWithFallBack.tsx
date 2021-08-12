import React, { ReactElement, useState } from 'react';
import Image from 'next/image';

export default function ImageWithFallBack(props: any): ReactElement {
  const { src, fallbackSrc, alt } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      layout="fill"
      objectFit="contain"
    />
  );
}
