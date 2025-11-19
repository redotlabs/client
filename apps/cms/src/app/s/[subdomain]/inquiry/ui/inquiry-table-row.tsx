import type { Inquiry } from '@/shared/types';
import { TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import InquiryStatusBadge from './inquiry-status-badge';
import OpenInquiryDetailButton from './open-inquiry-detail-button';

interface InquiryTableRowProps {
  inquiry: Inquiry;
  order: number;
}

const InquiryTableRow = ({ inquiry, order }: InquiryTableRowProps) => {
  const { inquiryNumber, inquirerName, title, createdAt, status } = inquiry;

  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell className="text-center">{order}</TableCell>
      <TableCell className="text-center">
        <OpenInquiryDetailButton inquiry={inquiry}>
          <button className="underline text-primary-500 hover:text-primary-600 transition-colors">
            {inquiryNumber}
          </button>
        </OpenInquiryDetailButton>
      </TableCell>
      <TableCell className="text-center">{inquirerName}</TableCell>
      <TableCell className="text-center">{title}</TableCell>
      <TableCell className="text-center">
        {format(createdAt, 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell align="center">
        <InquiryStatusBadge status={status} />
      </TableCell>
    </TableRow>
  );
};

export default InquiryTableRow;
