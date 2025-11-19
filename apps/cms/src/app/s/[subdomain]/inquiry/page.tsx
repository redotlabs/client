import { Table, TableBody } from '@redotlabs/ui';
import InquiryTableHeader from './ui/inquiry-table-header';
import InquiryTableRow from './ui/inquiry-table-row';
import InquiryTableToolbar from './ui/inquiry-table-toolbar';

export default function InquiryPage() {
  const data = [
    {
      id: 1,
      customerId: 1,
      inquiryNumber: '1234567890',
      inquirerName: 'John Doe',
      title: '상품 배송 문의',
      content:
        '안녕하세요. 주문한 상품이 아직 도착하지 않았습니다. 배송 상태를 확인해주실 수 있나요? 주문번호는 ORD-2024-001입니다.',
      status: 'UNPROCESSED',
      createdAt: '2025-11-12T09:18:54.619Z',
      phone: '010-1234-5678',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      customerId: 1,
      inquiryNumber: '0987654321',
      inquirerName: 'Jane Doe',
      title: '제품 불량 교환 요청',
      content:
        '구매한 제품에 불량이 있어 교환을 요청드립니다. 사진을 첨부했으니 확인 부탁드립니다.',
      status: 'PROGRESS',
      createdAt: '2025-11-13T14:30:22.619Z',
      phone: '010-9876-5432',
      email: 'jane.doe@example.com',
    },
    {
      id: 3,
      customerId: 1,
      inquiryNumber: '5555555555',
      inquirerName: '홍길동',
      title: '환불 처리 문의',
      content: '주문 취소 후 환불이 지연되고 있습니다. 확인 부탁드립니다.',
      status: 'COMPLETED',
      createdAt: '2025-11-10T11:45:33.619Z',
      phone: '010-5555-5555',
      email: 'hong@example.com',
    },
  ] as const;

  return (
    <main className="p-10 container mx-auto flex-1">
      <h1 className="text-2xl font-bold">문의 목록</h1>

      <div className="mt-8">
        <InquiryTableToolbar />

        <Table className="mt-8 w-full">
          <InquiryTableHeader />
          <TableBody>
            {data.map((inquiry, index) => (
              <InquiryTableRow
                key={inquiry.id}
                inquiry={inquiry}
                order={index + 1}
              />
            ))}
            {/* {data?.pages.map((page, i) =>
              page.content.map((inquiry, j) => (
                <InquiryTableRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  order={i * 10 + j + 1}
                />
              ))
            )} */}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
