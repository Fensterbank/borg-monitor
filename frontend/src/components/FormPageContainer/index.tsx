import { FC } from 'react';


interface FormPageContainerProps {
  title: string;
  subtitle?: any;
}

export const FormPageContainer: FC<FormPageContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pattern-vertical-lines-md text-orange-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-24 w-auto"
            src="/img/logo.png"
            alt="Papersubs"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
