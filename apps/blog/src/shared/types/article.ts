import { Category } from './category';
import { User } from './user';

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DELETED';

export interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  status: ArticleStatus;
  categoryId?: number | null;
  category?: Category;
  author: User;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Comment {
  id: number;
  articleId: number;
  parentId?: number | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
