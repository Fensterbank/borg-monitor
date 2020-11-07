import { FC } from 'react';

interface AppContainerProps {
  title: string;
  children: any;
}

export const AppContainer: FC<AppContainerProps> = ({ title, children }) => (
  <div className="h-screen flex overflow-hidden bg-gray-100">
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <div className="flex-1 px-4 flex justify-between items-center">
          <p className="text-xl">Borg Monitor</p>
        </div>
      </div>

      <main className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">{children}</div>
        </div>
      </main>
    </div>
  </div>
);
