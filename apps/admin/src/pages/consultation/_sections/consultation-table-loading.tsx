import { TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { Skeleton } from '@repo/ui';

const ConsultationTableLoading = () => {
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
      {/* 이메일 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
      {/* 연락처 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
      {/* 구분 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-12')} />
      </TableCell>
      {/* 상담 내용 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-48')} />
      </TableCell>
      {/* 상태 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-12')} />
      </TableCell>
      {/* 요청일 */}
      <TableCell align="center">
        <Skeleton className={baseClassName('max-w-24')} />
      </TableCell>
    </TableRow>
  ));
};

export default ConsultationTableLoading;
