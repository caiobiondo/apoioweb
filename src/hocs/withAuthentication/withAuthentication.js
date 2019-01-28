import React, { PureComponent } from 'react';
import Cookies from 'js-cookie';
import { LOGOUT_URL, OAM_PREFIX, OAM_FV_SUFFIX, HTTP_CDPESSOA } from 'config';

const LOGOUT_PATH = `${LOGOUT_URL}${window.location.href}`;

export default function withAuthentication(Component) {
  class AuthenticatedComponent extends PureComponent {
    componentDidMount() {
      console.log(this);
      console.log(Cookies.get(HTTP_CDPESSOA));
      // if (!this.isHttpCdPessoaCookiePresent() || !this.isOamCookiePresent) this.redirectToLogin();
    }

    isOamCookiePresent() {
      return Cookies.get(`${OAM_PREFIX}${OAM_FV_SUFFIX}`);
    }

    isHttpCdPessoaCookiePresent() {
      return Cookies.get(HTTP_CDPESSOA);
    }

    redirectToLogin() {
      window.location.assign(LOGOUT_PATH);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return AuthenticatedComponent;
}
