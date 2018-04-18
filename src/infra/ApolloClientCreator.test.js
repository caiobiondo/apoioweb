import ApolloClientCreator from './ApolloClientCreator';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

describe('ApolloClientCreator', () => {
  test('creates an Apollo Client', () => {
    // given
    const uri = 'a graphql-uri';
    const sso = '{ "accessToken": "an-access-token", "clientId": "a-client-id" }';
    const cnoToken = 'a-cno-token';
    const expectedClient = { client: 'an apollo client' };
    const expectedCache = { cache: 'a cache' };
    const expectedLink = 'a link';
    const apolloConstructorMock = jest.fn();
    const inMemoryCacheMock = jest.fn();
    const createHttpLink = jest.fn().mockReturnValue(expectedLink);
    const localStorageMock = key => {
      if (key === ACCESS_TOKEN_LOCAL_STORAGE_KEY) return sso;
      if (key === CNO_TOKEN_LOCAL_STORAGE_KEY) return cnoToken;
    };

    window.localStorage.getItem = localStorageMock;

    class ApolloClient {
      constructor(props) {
        apolloConstructorMock(props);
        return expectedClient;
      }
    }
    class InMemoryCache {
      constructor(props) {
        inMemoryCacheMock(props);
        return expectedCache;
      }
    }

    // when
    const creator = new ApolloClientCreator(
      uri,
      ACCESS_TOKEN_LOCAL_STORAGE_KEY,
      CNO_TOKEN_LOCAL_STORAGE_KEY,
      ApolloClient,
      InMemoryCache,
      createHttpLink,
    );
    const client = creator.create();

    // then
    expect(client).toEqual(expectedClient);
    expect(apolloConstructorMock).toBeCalledWith({
      cache: expectedCache,
      link: expectedLink,
      addTypename: true,
    });
    expect(inMemoryCacheMock).toBeCalled();
    expect(createHttpLink).toBeCalledWith({
      headers: {
        accessToken: 'an-access-token',
        cnotoken: 'a-cno-token',
        clientId: 'a-client-id',
      },
      uri: uri,
    });
  });
});
