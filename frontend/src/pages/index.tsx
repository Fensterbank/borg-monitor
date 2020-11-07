import { AppContainer } from '@@/components/AppContainer';
import { authenticated } from '@@/components/auth/authenticated';
import { Table } from '@@/components/Table';
import { useApiClient, apiRoutes } from '@@/lib/api/api';
import { ApiResult, Backup } from '@@/lib/api/types';
import Head from 'next/head';
import { useQuery } from 'react-query';

function Dashboard() {
  const client = useApiClient();

  const { data } = useQuery<ApiResult<Backup[]>, any>('backups', () =>
    client.fetch(`${apiRoutes.backups}/?_sort=id:DESC`),
  );

  if (data && data.data) {
    return (
      <>
        <Head>
          <title>Borg Monitor</title>
        </Head>
        <AppContainer title="Vergangene Backups">
          <Table items={data.data} />
        </AppContainer>
      </>
    );
  }
  return null;
}

export default authenticated(Dashboard);
