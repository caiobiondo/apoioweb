import ApolloClientCreator from './ApolloClientCreator';

describe('ApolloClientCreator', () => {
  test('creates an Apollo Client', () => {
    // given
    const uri = 'a graphql-uri';
    const sso = '{ "accessToken": "an-access-token", "clientId": "a-client-id" }';
    const accessTokenKey = 'a access-token key';
    const expectedClient = { client: 'an apollo client' };
    const expectedCache = { cache: 'a cache' };
    const expectedLink = 'a link';
    const apolloConstructorMock = jest.fn();
    const inMemoryCacheMock = jest.fn();
    const createHttpLink = jest.fn().mockReturnValue(expectedLink);
    const localStorageGetItemMock = jest.fn().mockReturnValue(sso);

    window.localStorage.getItem = localStorageGetItemMock;

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
      accessTokenKey,
      ApolloClient,
      InMemoryCache,
      createHttpLink,
    );
    const client = creator.create();

    // then
    expect(client).toEqual(expectedClient);
    expect(apolloConstructorMock).toBeCalledWith({ cache: expectedCache, link: expectedLink });
    expect(inMemoryCacheMock).toBeCalled();
    expect(createHttpLink).toBeCalledWith({
      headers: {
        accessToken: 'an-access-token',
        clientId: 'a-client-id',
      },
      uri: uri,
    });
  });
});
