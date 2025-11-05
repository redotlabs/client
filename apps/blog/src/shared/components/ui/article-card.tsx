import { Article } from '@/shared/types/article';
import React from 'react';
import { format } from 'date-fns';

const stripHtmlAndTruncate = (html: string, maxLength: number = 20): string => {
  // HTML 태그 제거
  const text = html.replace(/<[^>]*>/g, '');
  // 연속된 공백을 하나로
  const cleanText = text.replace(/\s+/g, ' ').trim();
  // maxLength로 자르기
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.slice(0, maxLength) + '...';
};

const ArticleCard = ({ article }: { article: Article }) => {
  const {
    title,
    content,
    thumbnail,
    status,
    category,
    author,
    isPublic,
    tags,
    createdAt,
  } = article;

  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
      <div className="flex flex-col gap-2">
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          {stripHtmlAndTruncate(content ?? '', 20)}
        </p>
      </div>
      <div className="flex flex-col gap-2"></div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">{tags}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          {format(createdAt, 'yyyy.MM.dd HH:mm')}
          {' · '}
          {author.name}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
