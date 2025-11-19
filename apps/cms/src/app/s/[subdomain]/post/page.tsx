'use client';

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@redotlabs/ui';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  MoreVertical,
} from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { RHFInput, RHFSelect, Card } from '@repo/ui';

const POSTS = [
  {
    id: 1,
    title: '2024년 웹 디자인 트렌드',
    author: '김철수',
    category: '디자인',
    status: 'published',
    views: 1234,
    comments: 15,
    publishedAt: '2025-11-14',
    thumbnail: '',
  },
  {
    id: 2,
    title: 'React 19 새로운 기능 소개',
    author: '이영희',
    category: '개발',
    status: 'published',
    views: 856,
    comments: 8,
    publishedAt: '2025-11-13',
    thumbnail: '',
  },
  {
    id: 3,
    title: 'SEO 최적화 가이드',
    author: '박민수',
    category: '마케팅',
    status: 'draft',
    views: 0,
    comments: 0,
    publishedAt: null,
    thumbnail: '',
  },
  {
    id: 4,
    title: 'Next.js 성능 최적화 팁',
    author: '정수진',
    category: '개발',
    status: 'published',
    views: 2341,
    comments: 23,
    publishedAt: '2025-11-11',
    thumbnail: '',
  },
  {
    id: 5,
    title: 'UX 디자인 베스트 프랙티스',
    author: '김철수',
    category: '디자인',
    status: 'scheduled',
    views: 0,
    comments: 0,
    publishedAt: '2025-11-20',
    thumbnail: '',
  },
  {
    id: 6,
    title: 'TypeScript 마스터하기',
    author: '최동욱',
    category: '개발',
    status: 'published',
    views: 1567,
    comments: 19,
    publishedAt: '2025-11-10',
    thumbnail: '',
  },
];

const STATUS_LABELS: Record<string, string> = {
  published: '게시됨',
  draft: '초안',
  scheduled: '예약',
};

export default function PostPage() {
  const [searchQuery] = useState('');
  const [selectedCategory] = useState('all');
  const [selectedStatus] = useState('all');

  const form = useForm({
    defaultValues: {
      search: '',
      category: 'all',
      status: 'all',
    },
  });

  const filteredPosts = POSTS.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalViews = POSTS.reduce((sum, post) => sum + post.views, 0);
  const totalComments = POSTS.reduce((sum, post) => sum + post.comments, 0);
  const publishedCount = POSTS.filter((p) => p.status === 'published').length;

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">게시글 관리</h1>
          <p className="text-gray-500 mt-1">총 {POSTS.length}개의 게시글</p>
        </div>
        <Button variant="contained" className="flex items-center gap-2">
          <Plus size={16} />새 게시글
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 게시글</p>
              <p className="text-xl font-bold mt-1">{POSTS.length}</p>
            </div>
            <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Edit className="text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">게시됨</p>
              <p className="text-xl font-bold mt-1">{publishedCount}</p>
            </div>
            <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
              <Eye className="text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 조회수</p>
              <p className="text-xl font-bold mt-1">
                {totalViews.toLocaleString()}
              </p>
            </div>
            <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Eye className="text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 댓글</p>
              <p className="text-xl font-bold mt-1">{totalComments}</p>
            </div>
            <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="mt-8">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <RHFInput
                label="검색"
                labelPlacement="left"
                size="sm"
                name="search"
                placeholder="제목으로 검색..."
                startContent={<Search size={16} className="text-gray-400" />}
              />

              <RHFSelect
                name="category"
                label="카테고리"
                size="sm"
                placeholder="모든 카테고리"
                labelPlacement="left"
                options={[
                  { label: '모든 카테고리', value: 'all' },
                  { label: '디자인', value: '디자인' },
                  { label: '개발', value: '개발' },
                  { label: '마케팅', value: '마케팅' },
                ]}
              />

              <RHFSelect
                name="status"
                label="상태"
                size="sm"
                placeholder="모든 상태"
                labelPlacement="left"
                options={[
                  { label: '모든 상태', value: 'all' },
                  { label: '게시됨', value: 'published' },
                  { label: '초안', value: 'draft' },
                  { label: '예약', value: 'scheduled' },
                ]}
              />
            </div>
            <Button type="submit" size="sm">
              검색
            </Button>
          </form>
        </FormProvider>
      </div>

      {/* 게시글 테이블 */}
      <Table className="mt-8 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>조회수</TableHead>
            <TableHead>댓글</TableHead>
            <TableHead>게시일</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow
              key={post.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell align="center">
                <p className="font-medium line-clamp-1">{post.title}</p>
              </TableCell>
              <TableCell align="center">{post.author}</TableCell>
              <TableCell align="center">
                <Badge
                  size="sm"
                  className="w-fit"
                  color={
                    post.category === '디자인'
                      ? 'default'
                      : post.category === '개발'
                        ? 'info'
                        : 'warning'
                  }
                >
                  {post.category}
                </Badge>
              </TableCell>
              <TableCell align="center">
                <Badge
                  color={
                    post.status === 'published'
                      ? 'success'
                      : post.status === 'draft'
                        ? 'default'
                        : 'info'
                  }
                  size="sm"
                  className="w-fit"
                >
                  {STATUS_LABELS[post.status]}
                </Badge>
              </TableCell>
              <TableCell align="center">
                {post.views.toLocaleString()}
              </TableCell>
              <TableCell align="center">{post.comments}</TableCell>
              <TableCell align="center">{post.publishedAt || '-'}</TableCell>
              <TableCell align="center">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </main>
  );
}
