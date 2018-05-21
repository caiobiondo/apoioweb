import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import Cookies from 'js-cookie';
import { OAM_PREFIX, OAM_FV_SUFFIX, OAM_CAPTA_SUFFIX, HTTP_CDPESSOA } from 'config';

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

  /* eslint-disable camelcase */
  _createAuthHeaders() {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const cnotoken = localStorage.getItem(this.cnoTokenKey);
    const userCode = localStorage.getItem(this.personIdTokenKey);
    const oamCookieValue = this._createCaptaCookieHeader();

    return { accessToken, userCode, cnotoken, oam_cookie: oamCookieValue };
  }
  /* eslint-enable camelcase */

  _createCaptaCookieHeader() {
    const cookieHttpCdPessoa = Cookies.get(HTTP_CDPESSOA);
    const cookieOam = Cookies.get(`${OAM_PREFIX}${OAM_FV_SUFFIX}`);
    const cookieValue = `${HTTP_CDPESSOA}=${cookieHttpCdPessoa}; ${OAM_PREFIX}${OAM_CAPTA_SUFFIX}=${cookieOam};`;

    return cookieValue;
  }
}
