import { config } from '@@/config/config';
import { useAuth } from '@@/context/AuthContext';
import fetch from 'isomorphic-unfetch';
import { stringify } from 'query-string';
import { useMemo } from 'react';
import urljoin from 'url-join';

import { ApiResult } from './types';

export const createApiRoute = (path: string): string =>
  urljoin(config.apiBaseUrl, path);

export const apiRoutes = {
  login: '/auth/local',
  me: '/users/me',
  backup: (id: number) => `/backup/${id}`,
  backups: '/backups',
};

export const createParameterizedApiRoute = (
  route: string,
  parameters?: any,
  page?: number,
  itemsPerPage?: number,
) => {
  const params = {
    ...parameters,
  };
  if (page && itemsPerPage) {
    params._limit = itemsPerPage;
    params._start = (page - 1) * itemsPerPage;
  }
  return `${route}?${stringify(params)}`;
};

export type ApiClient = {
  fetch: <T = any>(path: string, init?: RequestInit) => Promise<ApiResult<T>>;
};

type ApiClientOptions = {
  accessToken?: string;
};

const createResult = <T>(res: Response, data: T) =>
  res.ok ? { data } : { error: data };

export const createClient = ({
  accessToken,
}: ApiClientOptions = {}): ApiClient => {
  const wrappedFetch: ApiClient['fetch'] = (path, init) => {
    const url = urljoin(config.apiBaseUrl, path);

    const localInit: RequestInit = {
      ...init,
      headers: {
        ...(init?.body &&
          typeof init.body === 'string' && {
            'Content-Type': 'application/json; charset=utf-8',
          }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    };

    return fetch(url, localInit).then(async (res) =>
      res.headers.get('content-type')
        ? createResult(res, await res.json())
        : createResult(res, await res.text()),
    );
  };

  return {
    fetch: wrappedFetch,
  };
};

type UseApiClientOptions = {
  autoLogout: boolean;
};

export const useApiClient = (
  options: UseApiClientOptions = { autoLogout: true },
): ApiClient => {
  const { accessToken, logout } = useAuth();

  const client = useMemo(() => {
    const c = createClient({ accessToken });

    const fetchWithLogout: ApiClient['fetch'] = (input, init) =>
      c.fetch(input, init).then((res) => {
        if (res.error?.statusCode === 401) {
          logout();
        }

        return res;
      });

    return {
      ...c,
      ...(options.autoLogout && { fetch: fetchWithLogout }),
    };
  }, [accessToken]);

  return client;
};
