export default class ApolloClientCreator {
  constructor(uri, ApolloClient, InMemoryCache, createHttpLink) {
    this.uri = uri;
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
    return this.createHttpLink({ uri: this.uri });
  }
}
