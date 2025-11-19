import { Table, TableBody } from '@redotlabs/ui';
import ConsultantTableHeader from './ui/consultant-table-header';
import ConsultantTableRow from './ui/consultant-table-row';

const MOCK_CONSULTANTS = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    isRenewal: true,
    currentWebsiteUrl: 'https://old-company.com',
    consultContent:
      '현재 운영 중인 홈페이지가 오래되어 전면 리뉴얼을 원합니다. 모던한 디자인과 반응형 웹으로 제작을 희망합니다.',
    status: 'UNPROCESSED' as const,
    createdAt: '2025-11-12T09:30:00.000Z',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    isRenewal: false,
    consultContent:
      '새로운 쇼핑몰 사이트를 제작하고 싶습니다. 결제 시스템과 재고 관리 기능이 필요합니다.',
    status: 'PROGRESS' as const,
    createdAt: '2025-11-13T14:15:00.000Z',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    isRenewal: true,
    currentWebsiteUrl: 'https://old-portfolio.com',
    consultContent:
      '포트폴리오 사이트 리뉴얼 상담 원합니다. 작품 갤러리와 연락 폼이 필요합니다.',
    status: 'COMPLETED' as const,
    createdAt: '2025-11-10T11:00:00.000Z',
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    isRenewal: false,
    consultContent:
      '회사 소개 홈페이지 제작을 희망합니다. 깔끔하고 전문적인 느낌을 원합니다.',
    status: 'UNPROCESSED' as const,
    createdAt: '2025-11-15T10:20:00.000Z',
  },
  {
    id: 5,
    name: '최동욱',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    isRenewal: true,
    currentWebsiteUrl: 'https://old-blog.com',
    consultContent:
      '블로그 플랫폼 리뉴얼 상담 원합니다. SEO 최적화와 빠른 로딩 속도가 중요합니다.',
    status: 'PROGRESS' as const,
    createdAt: '2025-11-14T16:45:00.000Z',
  },
];

const ConsultantPage = () => {
  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">상담 요청 목록</h1>
          <p className="text-gray-500 mt-1">
            총 {MOCK_CONSULTANTS.length}건의 상담 요청
          </p>
        </div>
      </div>

      <Table className="mt-8 w-full">
        <ConsultantTableHeader />
        <TableBody>
          {MOCK_CONSULTANTS.map((consultant, index) => (
            <ConsultantTableRow
              key={consultant.id}
              consultant={consultant}
              order={index + 1}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default ConsultantPage;

