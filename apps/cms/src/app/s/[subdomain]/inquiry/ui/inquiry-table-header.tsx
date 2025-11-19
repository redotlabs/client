import { cn } from '@redotlabs/utils';
import { TableHeader, TableRow, TableHead } from '@redotlabs/ui';

const InquiryTableHeader = () => {
  return (
    <TableHeader className="h-11">
      <TableRow
        className={cn(
          'text-sm font-semibold text-gray-800',
          '[&>th]:p-3 [&>th]:bg-gray-100',
          '[&>th:first-child]:rounded-l-md [&>th:last-child]:rounded-r-md'
        )}
      >
        <TableHead className="text-center">순번</TableHead>
        <TableHead className="text-center">문의번호</TableHead>
        <TableHead className="text-center">문의자</TableHead>
        <TableHead className="text-center">제목</TableHead>
        <TableHead className="text-center">문의일시</TableHead>
        <TableHead className="text-center">상태</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InquiryTableHeader;
