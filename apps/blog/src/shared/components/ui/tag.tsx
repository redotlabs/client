import React from 'react';

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <div className="text-gray-700 bg-gray-200 rounded-md px-2 py-1 text-sm font-medium">
      #{tag}
    </div>
  );
};

export default Tag;
