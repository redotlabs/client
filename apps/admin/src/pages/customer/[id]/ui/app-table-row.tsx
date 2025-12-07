import type { App } from '@/shared/types';
import { Badge, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';

interface AppTableRowProps {
  app: App;
  order: number;
}

const AppTableRow = ({ app, order }: AppTableRowProps) => {
  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">#{app.id}</TableCell>
      <TableCell align="center">{app.name}</TableCell>
      <TableCell align="center">
        <a
          href={`https://${app.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline"
        >
          {app.domain}
        </a>
      </TableCell>
      <TableCell align="center">
        <Badge
          size="sm"
          color={app.status === 'active' ? 'success' : 'default'}
          className="w-fit"
        >
          {app.status === 'active' ? '활성' : '비활성'}
        </Badge>
      </TableCell>
      <TableCell align="center">
        {format(new Date(app.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell align="center">
        {app.lastDeployedAt
          ? format(new Date(app.lastDeployedAt), 'yyyy-MM-dd HH:mm')
          : '-'}
      </TableCell>
    </TableRow>
  );
};

export default AppTableRow;

