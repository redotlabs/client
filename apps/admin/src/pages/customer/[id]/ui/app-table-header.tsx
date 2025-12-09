import { TableHead, TableHeader, TableRow } from '@redotlabs/ui';

const AppTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>앱 ID</TableHead>
        <TableHead>앱 이름</TableHead>
        <TableHead>도메인</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>생성일</TableHead>
        <TableHead>마지막 배포</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AppTableHeader;

