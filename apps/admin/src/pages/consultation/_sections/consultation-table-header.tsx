import { TableHead, TableHeader, TableRow } from '@redotlabs/ui';

const ConsultationTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>ID</TableHead>
        <TableHead>이메일</TableHead>
        <TableHead>연락처</TableHead>
        <TableHead>구분</TableHead>
        <TableHead>상담 내용</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>요청일</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ConsultationTableHeader;
