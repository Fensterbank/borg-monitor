import { User } from '@@/lib/api/types';
import { apiRoutes, createApiRoute } from '@@lib/api/api';
import { ROUTES } from '@@lib/routes';
import { addHours } from 'date-fns';
import cookie from 'js-cookie';
import Router, { useRouter } from 'next/router';
import {
  useState,
  useContext,
  useEffect,
  useCallback,
  createContext,
  FC,
} from 'react';
import { useQuery, queryCache } from 'react-query';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
const LOGOUT_TIMESTAMP_KEY = 'logout';

type LogoutOptions = {
  /**
   * Decides whether to log out of all open windows
   */
  full?: boolean;
};

const useSyncLogout = (logoutFn: (opts: LogoutOptions) => void) => {
  useEffect(() => {
    /**
     * Make sure we log out on all open windows
     */
    const syncLogout = (event: StorageEvent) => {
      if (event.key === LOGOUT_TIMESTAMP_KEY) {
        logoutFn({ full: false });
      }
    };

    window.addEventListener('storage', syncLogout);

    return () => {
      window.removeEventListener('storage', syncLogout);
      window.localStorage.removeItem(LOGOUT_TIMESTAMP_KEY);
    };
  }, []);
};

const restoreAccessToken = () => cookie.get(ACCESS_TOKEN_COOKIE_NAME);

export type AuthContextType = {
  login: (accessToken: string) => void;
  logout: () => void;
  accessToken?: string;
  user?: User;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    restoreAccessToken,
  );

  const login = useCallback(
    (accessToken: string) => setAccessToken(accessToken),
    [],
  );

  const logout = useCallback(({ full = true }: LogoutOptions = {}) => {
    cookie.remove(ACCESS_TOKEN_COOKIE_NAME);

    setAccessToken(undefined);

    // remove user from cache
    queryCache.removeQueries('me', { exact: true });

    if (full) {
      // notify other tabs that a logout has occurred
      window.localStorage.setItem(LOGOUT_TIMESTAMP_KEY, Date.now().toString());
    }

    Router.push(ROUTES.ROOT);
  }, []);

  const { data: user, refetch, isFetching } = useQuery<User, string>(
    'me',
    () =>
      fetch(createApiRoute(apiRoutes.me), {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      })
        .then((res) => res.json())
        .then((u) => {
          if (u.statusCode === 401) {
            logout();
            return undefined;
          }

          return u;
        }),
    {
      enabled: accessToken != null,
    },
  );

  useSyncLogout(logout);

  useEffect(() => {
    if (accessToken) {
      refetch()
        .then(() => {
          cookie.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
            expires: addHours(Date.now(), 10),
          });
        })
        .catch(() => logout());
    }
  }, [accessToken]);

  const value: AuthContextType = {
    login,
    logout,
    accessToken,
    user,
    isFetching,
    refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

type UseUserOptions = {
  /**
   * Redirect to the given path if the user is not authenticated
   */
  redirectTo?: string;
};

export const useUser = ({ redirectTo }: UseUserOptions = {}) => {
  const { user, isFetching } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && !user && redirectTo) {
      router.push(redirectTo);
    }
  }, [user, redirectTo]);

  return user || undefined;
};
