import { FormPageContainer } from '@@/components/FormPageContainer';
import { useAuth } from '@@/context/AuthContext';
import { useApiClient, apiRoutes } from '@@/lib/api/api';
import { ApiResult, AuthInfo, StrapiError } from '@@/lib/api/types';
import { ROUTES } from '@@/lib/routes';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

type Credentials = {
  identifier: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { accessToken, login } = useAuth();
  const { fetch } = useApiClient();

  const [loginRequest, { data, status }] = useMutation<
    ApiResult<AuthInfo>,
    ApiError,
    Credentials
  >((credentials: Credentials) =>
    fetch(apiRoutes.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  );

  useEffect(() => {
    if (accessToken) {
      router.replace(ROUTES.ROOT);
    }
  }, [accessToken]);

  useEffect(() => {
    if (data?.data?.jwt) {
      login(data.data.jwt);
    }
  }, [data]);

  const strapiError = (data?.error?.message[0] as any)
    ? ((data?.error?.message[0] as any).messages[0] as StrapiError)
    : undefined;

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    onSubmit: (values) => {
      return loginRequest(values);
    },
  });

  const renderStrapiError = (strapiError: StrapiError) => {
    switch (strapiError.id) {
      case 'Auth.form.error.invalid':
        return 'Benutzername oder Passwort falsch.';
      case 'Auth.form.error.ratelimit':
        return 'Zu viele Fehlversuche. Bitte versuchen Sie es in einer Minute erneut.';
      default:
        return strapiError.message;
    }
  };

  const formDisabled = status === 'loading';

  return (
    <FormPageContainer title="Melden Sie sich an">
      <Head>
        <title>Borg Monitor</title>
      </Head>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-black">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                E-Mail-Adresse
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="identifier"
                  type="mail"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Passwort
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className={clsx(
                    'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 transition duration-150 ease-in-out',
                    {
                      'opacity-50 cursor-not-allowed': formDisabled,
                      'hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-indigo active:bg-orange-700': !formDisabled,
                    },
                  )}
                  disabled={formDisabled}
                >
                  Anmelden
                </button>
              </span>
            </div>
            {strapiError && (
              <div className="mt-6 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 text-red-800">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm leading-5 font-medium text-red-800">
                      Fehler
                    </h3>
                    <div className="mt-2 text-sm leading-5 text-red-700">
                      {renderStrapiError(strapiError)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormPageContainer>
  );
}
