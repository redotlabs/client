import { Table, TableBody } from '@redotlabs/ui';
import CustomerTableHeader from './ui/customer-table-header';
import CustomerTableRow from './ui/customer-table-row';

const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    company: '테크컴퍼니',
    status: 'active' as const,
    createdAt: '2024-01-15T09:00:00.000Z',
    lastLoginAt: '2025-11-15T14:30:00.000Z',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    company: '디자인스튜디오',
    status: 'active' as const,
    createdAt: '2024-03-20T10:30:00.000Z',
    lastLoginAt: '2025-11-14T09:15:00.000Z',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    phone: '010-3456-7890',
    company: '마케팅그룹',
    status: 'inactive' as const,
    createdAt: '2024-06-10T15:20:00.000Z',
    lastLoginAt: '2025-10-30T16:45:00.000Z',
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    phone: '010-4567-8901',
    status: 'active' as const,
    createdAt: '2024-08-05T11:00:00.000Z',
    lastLoginAt: '2025-11-15T11:20:00.000Z',
  },
  {
    id: 5,
    name: '최동욱',
    email: 'choi@example.com',
    phone: '010-5678-9012',
    company: '소프트웨어랩',
    status: 'active' as const,
    createdAt: '2024-09-18T14:45:00.000Z',
    lastLoginAt: '2025-11-13T15:40:00.000Z',
  },
];

const CustomerPage = () => {
  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">고객 목록</h1>
          <p className="text-gray-500 mt-1">
            총 {MOCK_CUSTOMERS.length}명의 고객
          </p>
        </div>
      </div>

      <Table className="mt-8 w-full">
        <CustomerTableHeader />
        <TableBody>
          {MOCK_CUSTOMERS.map((customer, index) => (
            <CustomerTableRow
              key={customer.id}
              customer={customer}
              order={index + 1}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default CustomerPage;

