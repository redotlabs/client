export interface AppPage<T = unknown> {
  id: number;
  title: string;
  description?: string | null;
  path: string;
  content: T;
  isProtected?: boolean;
  createdAt: string;
  updatedAt: string;
}
