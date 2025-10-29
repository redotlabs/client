'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/shared/api/services/article/detail';
import { useMutation } from '@tanstack/react-query';
import { PATH } from '@/shared/constants/routes';
import { Button, toast } from '@redotlabs/ui';

const CreateArticleButton = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({ mutationFn: createArticle });

  const onCreate = () =>
    mutate(
      {},
      {
        onSuccess: ({ id }) => {
          router.push(PATH.admin.article.detail(id));
        },
        onError: (error) => {
          toast.error(error?.message || '아티클 생성에 실패했습니다.');
        },
      }
    );

  const onClick = () => {
    const ok = window.confirm('아티클을 생성하시겠습니까?');
    if (ok) {
      onCreate();
    }
  };

  return (
    <Button size="sm" onClick={onClick} disabled={isPending}>
      글쓰기
    </Button>
  );
};

export default CreateArticleButton;
