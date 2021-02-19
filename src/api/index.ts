import axios from 'axios';

const restqlUrl = process.env.REACT_APP_RESTQL_URL;
const adminUrl = restqlUrl + '/admin';

type FetchTenantsResponse = {
  tenants: string[]
}

export async function fetchTenants(): Promise<string[]> {
  const response = await axios({
    method: 'GET',
    baseURL: adminUrl,
    url: '/tenant',
  });

  const data = response.data as FetchTenantsResponse;

  return data.tenants;
}

type FetchNamespacesResponse = {
  namespaces: string[]
}

export async function fetchNamespaces() {
  const response = await axios({
    method: 'GET',
    baseURL: adminUrl,
    url: '/namespace'
  });

  const data = response.data as FetchNamespacesResponse;

  return data.namespaces;
}

type FetchQueriesFromNamespace = {
  namespace: string,
  queries: {
    namespace: string,
    name: string,
    revisions: {
      text: string,
      revision: number
    }[]
  }[]
}

export async function fetchQueriesFromNamespace(namespace: string): Promise<FetchQueriesFromNamespace> {
  const response = await axios({
    method: 'GET',
    baseURL: adminUrl,
    url: `/namespace/${namespace}/query`
  });

  const data = response.data as FetchQueriesFromNamespace;

  return data;
}

export async function runQuery(text: string, params: Record<string, any>) {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: restqlUrl,
      url: `/run-query`,
      data: text,
      headers: {
        "Content-Type": "text/plain"
      },
      params: params,
    });

    return response.data
  } catch (error) {
    console.log('failed to run query', error);
    return error.response.data;
  }
}