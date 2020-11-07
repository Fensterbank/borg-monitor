import { Backup } from '@@/lib/api/types';
import clsx from 'clsx';
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
  if (!started || !finished) return null;
  return (
    <p className="text-xs">
      {formatDistance(new Date(started), new Date(finished), { locale: de })}
    </p>
  );
};

export const Row: FC<Props> = ({ children, index }) => {
  return (
    <tr
      id={`id${children.id}`}
      className={clsx('border-l-4', {
        'bg-gray-50': index % 2 !== 0,
        'bg-white': index % 2 === 0,
        'border-red-700': children.status === 'failed',
        'border-blue-300': children.status === 'started',
        'border-green-700': children.status === 'finished',
      })}
    >
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 align-top">
        <p className="text-lg text-gray-900 font-medium">{children.name}</p>
        <p className="text-xs text-gray-700">{children.repo}</p>
        <p className="text-xs text-gray-500">
          {children.script} | {children.borg}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 align-top">
        <p className="text-sm">Start: {formatDate(children.created_at)}</p>
        <p className="text-sm">Ende: {formatDate(children.finished_at)}</p>
        {formatDuration(children.created_at, children.finished_at)}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 align-top">
        <pre className="w-full text-xs">{children.stats}</pre>
      </td>
    </tr>
  );
};
