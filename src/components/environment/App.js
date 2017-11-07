import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY } from 'config';

import { Main } from './App.styles';
import Orders from 'components/ecosystems/Orders/Orders';
import OrderDetails from 'components/ecosystems/OrderDetails/OrderDetails';

import { ThemeProvider, theme, setupGlobals, setupFonts } from 'natura-ui';

import { locale, flattenMessages, messages } from 'locale/index';

setupGlobals();
setupFonts();

const client = new ApolloClientCreator(GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY).create();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Main>
                <Route exact path="/my-orders" component={Orders} />
                <Route path="/my-orders/:id" component={OrderDetails} />
              </Main>
            </BrowserRouter>
          </ApolloProvider>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
