import { Backup } from '@@/lib/api/types';
import { format, formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';
import { FC } from 'react';

interface Props {
  children: Backup;
  index: number;
}

const formatDate = (date: string) => {
  if (!date) return null;
  return `${format(new Date(date), 'P, p', {
    locale: de,
  })} Uhr`;
};

const formatDuration = (started: string, finished: string) => {
  if (!started || !finished) return '-';
  return formatDistance(new Date(started), new Date(finished), { locale: de });
};

export const Row: FC<Props> = ({ children, index }) => {
  return (
    <tr className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
        <p className="text-md text-gray-900 font-medium">{children.name}</p>
        <p className="text-xs text-gray-700">{children.repo}</p>
        <p className="text-xs text-gray-500">
          Script {children.script} | Borg {children.borg}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        <p className="text-md">Start: {formatDate(children.created_at)}</p>
        <p className="text-md">Ende: {formatDate(children.finished_at)}</p>
        <p className="text-md">
          Dauer: {formatDuration(children.created_at, children.finished_at)}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        <pre className="w-full text-xs">{children.stats}</pre>
      </td>
    </tr>
  );
};
