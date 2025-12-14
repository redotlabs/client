export interface Pagination<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface PageParams {
  page?: number;
  size?: number;
}
