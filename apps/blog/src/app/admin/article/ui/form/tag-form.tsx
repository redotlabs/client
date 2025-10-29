'use client';

import { Button, Input, toast } from '@redotlabs/ui';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const TagForm = () => {
  const [tempTag, setTempTag] = useState('');
  const { control, setValue } = useFormContext();
  const tags: string[] = useWatch({ control, name: 'tags' });

  const addTag = () => {
    const _tag = tempTag.trim();
    if (!_tag) {
      return toast.error('태그를 입력해주세요.');
    }
    if (tags.includes(_tag)) {
      return toast.error('이미 존재하는 태그입니다.');
    }
    setTempTag('');
    setValue('tags', [...tags, _tag]);
  };

  const removeTag = (index: number) => {
    setValue(
      'tags',
      tags.filter((_, i) => i !== index)
    );
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  return (
    <section>
      <h2 className="text-lg font-semibold">태그</h2>

      <div className="py-4 flex items-center gap-4">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 font-medium bg-gray-200 rounded-md px-4 py-1"
          >
            <span>{tag}</span>
            <Button
              size="sm"
              variant="text"
              onClick={() => removeTag(index)}
              className="p-0"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="py-4 flex items-center gap-4">
        <Input
          className="w-full"
          value={tempTag}
          onChange={(e) => setTempTag(e.target.value)}
          onKeyUp={onKeyUp}
          placeholder="태그를 입력해주세요."
        />
        <Button onClick={addTag} disabled={!tempTag.trim()}>
          태그 추가
        </Button>
      </div>
    </section>
  );
};

export default TagForm;
