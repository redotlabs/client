import { TableHead, TableHeader, TableRow } from '@redotlabs/ui';

const CustomerTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>ID</TableHead>
        <TableHead>이름</TableHead>
        <TableHead>이메일</TableHead>
        <TableHead>전화번호</TableHead>
        <TableHead>회사</TableHead>
        <TableHead>앱 개수</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>가입일</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CustomerTableHeader;

