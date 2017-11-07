export default class ApolloClientCreator {
  constructor(uri, accessTokenKey, ApolloClient, InMemoryCache, createHttpLink) {
    this.uri = uri;
    this.accessTokenKey = accessTokenKey;
    this.ApolloClient = ApolloClient || require('apollo-client').ApolloClient;
    this.InMemoryCache = InMemoryCache || require('apollo-cache-inmemory').InMemoryCache;
    this.createHttpLink = createHttpLink || require('apollo-link-http').createHttpLink;
  }

  create() {
    const link = this._createLink();
    const cache = this._createCache();
    return new this.ApolloClient({ cache, link });
  }

  _createCache() {
    return new this.InMemoryCache();
  }

  _createLink() {
    const headers = this._createAuthHeaders();
    return this.createHttpLink({
      headers: headers,
      uri: this.uri,
    });
  }

  _createAuthHeaders() {
    return JSON.parse(localStorage.getItem(this.accessTokenKey));
  }
}
