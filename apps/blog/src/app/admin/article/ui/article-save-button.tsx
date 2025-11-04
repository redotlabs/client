'use client';

import { useUpdateArticle } from '@/shared/api/queries/article/detail';
import { Article } from '@/shared/types/article';
import { Button, toast } from '@redotlabs/ui';
import { useTiptapEditor } from '@repo/editor/hooks';
import { useParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

const ArticleSaveButton = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { mutate, isPending } = useUpdateArticle();

  const form = useFormContext();
  const { editor } = useTiptapEditor();

  const onSave = (data: Partial<Article>) => {
    const content = editor?.getHTML();

    const payload = {
      articleId: +articleId,
      article: {
        ...data,
        content,
        status: 'DRAFT',
      },
    } as const;

    mutate(payload, {
      onSuccess: () => {
        toast.success('임시저장되었습니다.');
      },
      onError: (error) => {
        toast.error(error?.message || '임시저장에 실패했습니다.');
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="outlined"
      onClick={form.handleSubmit(onSave)}
      disabled={isPending}
    >
      {isPending ? '임시저장중...' : '임시저장'}
    </Button>
  );
};

export default ArticleSaveButton;
