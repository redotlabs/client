import { TableHead, TableHeader, TableRow } from '@redotlabs/ui';

const CustomerTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>ID</TableHead>
        <TableHead>이름</TableHead>
        <TableHead>이메일</TableHead>
        <TableHead>생성 앱 수</TableHead>
        <TableHead>가입 수단</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>생성일</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CustomerTableHeader;
