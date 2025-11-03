import React from 'react';
import Image from 'next/image';

const WebsiteExampleCard = ({
  thumbnail,
  title,
  description,
}: {
  thumbnail: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white/40 rounded-md p-6 border border-gray-200 flex-shrink-0 w-full md:max-w-[354px]">
      <Image
        src={thumbnail}
        alt={title}
        width={354}
        height={218}
        className="w-full object-cover"
      />
      <h3 className="mt-7 text-gray-700 text-xl font-semibold">{title}</h3>
      <p className="mt-9 text-gray-700">{description}</p>
    </div>
  );
};

export default WebsiteExampleCard;
