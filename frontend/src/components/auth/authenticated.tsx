import { NextPage, GetServerSideProps } from 'next';
import nextCookie from 'next-cookies';
import React from 'react';

import { useUser } from '@@/context/AuthContext';
import { ROUTES } from '@@lib/routes';

/**
 * Higher order function which will redirect the user
 * if he is not logged in from the server side.
 *
 * @param redirectTo The path to redirect the user if not authenticated.
 */
export const withServerSideAuth = (redirectTo: string = ROUTES.ROOT) => (
  getServerSideProps: GetServerSideProps,
): GetServerSideProps => async ctx => {
  const { accessToken } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!accessToken) {
    // eslint-disable-next-line no-unused-expressions
    ctx.res?.writeHead(302, { Location: redirectTo });
    // eslint-disable-next-line no-unused-expressions
    ctx.res?.end();
  }

  return getServerSideProps(ctx);
};

export const authenticated = <P extends object = {}, IP = P>(
  WrappedComponent: NextPage<P, IP>,
) => {
  const Wrapper: NextPage<P, IP> = props => {
    useUser({ redirectTo: ROUTES.LOGIN });

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
