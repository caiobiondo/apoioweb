import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Orders from '../ecosystems/Orders';
import OrderDetails from '../ecosystems/OrderDetails';

import { ThemeProvider, theme, setupGlobals } from 'natura-ui';

setupGlobals();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale="pt-BR">
          <BrowserRouter>
            <div>
              <Route exact path="/my-orders" component={Orders} />
              <Route path="/my-orders/:id" component={OrderDetails} />
            </div>
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
