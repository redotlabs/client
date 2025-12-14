import type { Consultation } from '@repo/types';
import { Button, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import {
  ConsultationSheet,
  ConsultationTypeBadge,
  ConsultationStatusBadge,
} from '../_ui';

interface ConsultationTableRowProps {
  consultation: Consultation;
  order: number;
}

const ConsultationTableRow = ({
  consultation,
  order,
}: ConsultationTableRowProps) => {
  const { id, email, phone, content, status, type, createdAt } = consultation;

  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">
        <ConsultationSheet
          consultation={consultation}
          trigger={
            <Button variant="text" size="sm" className="p-0 underline">
              {id}
            </Button>
          }
        />
      </TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">{phone}</TableCell>
      <TableCell align="center">
        <ConsultationTypeBadge type={type} />
      </TableCell>
      <TableCell align="center">
        <p className="truncate max-w-[200px]">{content}</p>
      </TableCell>
      <TableCell align="center">
        <ConsultationStatusBadge status={status!} />
      </TableCell>
      <TableCell align="center">
        {format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
    </TableRow>
  );
};

export default ConsultationTableRow;
