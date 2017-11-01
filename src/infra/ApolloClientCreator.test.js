import ApolloClientCreator from './ApolloClientCreator';

describe('ApolloClientCreator', () => {
  test('creates an Apollo Client', () => {
    // given
    const uri = 'a graphql-uri';
    const expectedClient = { client: 'an apollo client' };
    const expectedCache = { cache: 'a cache' };
    const expectedLink = 'a link';
    const apolloConstructorMock = jest.fn();
    const inMemoryCacheMock = jest.fn();
    const createHttpLink = jest.fn().mockReturnValue(expectedLink);
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
    const creator = new ApolloClientCreator(uri, ApolloClient, InMemoryCache, createHttpLink);
    const client = creator.create();

    // then
    expect(client).toEqual(expectedClient);
    expect(apolloConstructorMock).toBeCalledWith({ cache: expectedCache, link: expectedLink });
    expect(inMemoryCacheMock).toBeCalled();
    expect(createHttpLink).toBeCalledWith({ uri: uri });
  });
});
