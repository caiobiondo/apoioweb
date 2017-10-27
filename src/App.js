import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Orders from './components/ecosystems/Orders';
import OrderDetails from './components/ecosystems/OrderDetails';

import { ThemeProvider, theme, setupGlobals } from 'natura-ui';

setupGlobals();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider>
          <BrowserRouter>
            <div>
              <Route exact path="/my-orders" component={Orders} />
              <Route path="/my-orders/:id" component={OrderDetails} />
              <Redirect from="/" to="/my-orders" />
            </div>
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
