import { TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { Skeleton } from '@repo/ui';

const CustomerTableLoading = () => {
  const baseClassName = (className: string) => cn('w-full h-6', className);

  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow
      key={index}
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      {/* No. */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-6')} />
      </TableCell>
      {/* ID */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-6')} />
      </TableCell>
      {/* 이름 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
      {/* 이메일 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
      {/* 생성 앱 수 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-48')} />
      </TableCell>
      {/* 가입 수단 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-12')} />
      </TableCell>
      {/* 상태 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-12')} />
      </TableCell>
      {/* 생성일 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
      {/* 작업 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-12')} />
      </TableCell>
    </TableRow>
  ));
};

export default CustomerTableLoading;
