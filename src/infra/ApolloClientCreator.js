import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

export default class ApolloClientCreator {
  constructor(
    uri,
    accessTokenKey,
    cnoTokenKey,
    personIdTokenKey,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
  ) {
    this.uri = uri;
    this.accessTokenKey = accessTokenKey;
    this.cnoTokenKey = cnoTokenKey;
    this.personIdTokenKey = personIdTokenKey;
    this.ApolloClient = ApolloClient || require('apollo-client').ApolloClient;
    this.InMemoryCache = InMemoryCache || require('apollo-cache-inmemory').InMemoryCache;
    this.createHttpLink = createHttpLink || require('apollo-link-http').createHttpLink;
  }

  create(links) {
    const link = this._createLink(links);
    const cache = this._createCache();

    return new this.ApolloClient({ cache, link, addTypename: true });
  }

  _createCache() {
    return new this.InMemoryCache({
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'Course':
            return object.id;
          default:
            return defaultDataIdFromObject(object);
        }
      },
    });
  }

  _createLink(links) {
    const headers = this._createAuthHeaders();
    const httpLink = this.createHttpLink({
      headers: headers,
      uri: this.uri,
    });

    if (links && links.length) {
      return links.reduce((nextLink, link) => {
        return link.concat(nextLink);
      }, httpLink);
    }

    return httpLink;
  }

  _createAuthHeaders() {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const cnotoken = localStorage.getItem(this.cnoTokenKey);
    const userCode = localStorage.getItem(this.personIdTokenKey);

    return { accessToken, userCode, cnotoken };
  }
}
