import { Backup } from '@@/lib/api/types';
import { Row } from '@@/Row';
import { FC } from 'react';

interface Props {
  items: Backup[];
}

export const Table: FC<Props> = ({ items }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Zeitrahmen
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Infos
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <Row key={item.id} index={index}>
                    {item}
                  </Row>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
