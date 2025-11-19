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
import { Search, MoreVertical, Mail, Phone, Edit } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { RHFInput } from '@repo/ui';

const USERS = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    status: 'active',
    lastLogin: '2025-11-15 14:30',
    joinedAt: '2024-01-15',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    status: 'active',
    lastLogin: '2025-11-14 09:15',
    joinedAt: '2024-03-20',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    status: 'inactive',
    lastLogin: '2025-10-30 16:45',
    joinedAt: '2024-06-10',
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    status: 'active',
    lastLogin: '2025-11-15 11:20',
    joinedAt: '2024-08-05',
  },
  {
    id: 5,
    name: '최동욱',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    status: 'active',
    lastLogin: '2025-11-13 15:40',
    joinedAt: '2024-09-18',
  },
] as const;

const STATUS_LABELS = {
  active: '활성',
  inactive: '비활성',
};

export default function UserPage() {
  const [searchQuery] = useState('');
  const [selectedStatus] = useState('all');

  const form = useForm({
    defaultValues: {
      status: 'all',
    },
  });

  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">사용자 관리</h1>
          <p className="text-gray-500 mt-1">총 {USERS.length}명의 사용자</p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="mt-8">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between"
          >
            <RHFInput
              label="검색"
              labelPlacement="left"
              size="sm"
              name="search"
              placeholder="이름 또는 이메일로 검색..."
              startContent={<Search size={16} className="text-gray-400" />}
            />
            <Button type="submit" size="sm">
              검색
            </Button>
          </form>
        </FormProvider>
      </div>

      {/* 사용자 테이블 */}
      <Table className="mt-8 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>마지막 로그인</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell align="center">
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} />
                  {user.phone}
                </div>
              </TableCell>
              <TableCell align="center">
                <Badge
                  className="w-fit"
                  color={user.status === 'active' ? 'success' : 'danger'}
                >
                  {STATUS_LABELS[user.status]}
                </Badge>
              </TableCell>
              <TableCell align="center">{user.lastLogin}</TableCell>
              <TableCell align="center">{user.joinedAt}</TableCell>
              <TableCell align="center">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mail size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-600" />
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </main>
  );
}
