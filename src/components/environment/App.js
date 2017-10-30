import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { Main } from './App.styles';
import Orders from '../ecosystems/Orders/Orders';
import OrderDetails from '../ecosystems/OrderDetails/OrderDetails';

import { ThemeProvider, theme, setupGlobals } from 'natura-ui';

setupGlobals();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale="pt-BR">
          <BrowserRouter>
            <Main>
              <Route exact path="/my-orders" component={Orders} />
              <Route path="/my-orders/:id" component={OrderDetails} />
            </Main>
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
