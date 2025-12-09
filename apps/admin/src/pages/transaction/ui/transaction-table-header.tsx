import { TableHead, TableHeader, TableRow } from '@redotlabs/ui';

const TransactionTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>거래 ID</TableHead>
        <TableHead>구분</TableHead>
        <TableHead>거래처</TableHead>
        <TableHead>금액</TableHead>
        <TableHead>결제방법</TableHead>
        <TableHead>상태</TableHead>
        <TableHead>거래일</TableHead>
        <TableHead>비고</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TransactionTableHeader;

