import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

import Orders from 'components/ecosystems/Orders/Orders';
import OrderDetails from 'components/ecosystems/OrderDetails/OrderDetails';
import MyScore from 'components/ecosystems/MyScore';
import CustomerDetails from 'components/ecosystems/Customers/Details';
import CustomersList from 'components/ecosystems/Customers/List';
import { EditCustomer, NewCustomer } from 'components/ecosystems/Customers/Form';
import StockList from 'components/ecosystems/Stock/List';
import StockImportOrdersList from 'components/ecosystems/Stock/Import/organisms/List/List';
import StockImportOrderDetails from 'components/ecosystems/Stock/Import/organisms/Details/Details';

import withAuthentication from 'hocs/withAuthentication';

import { ThemeProvider, theme, setupGlobals, setupFonts } from 'natura-ui';
import { locale, flattenMessages, messages } from 'locale/index';

setupGlobals();
setupFonts();

const client = new ApolloClientCreator(
  GRAPHQL_URI,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  CNO_TOKEN_LOCAL_STORAGE_KEY,
).create();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <div>
                <Route exact path="/my-orders" component={withAuthentication(Orders)} />
                <Route path="/my-orders/detail/:id" component={withAuthentication(OrderDetails)} />
                <Route path="/my-score" component={withAuthentication(MyScore)} />
                <Route exact path="/my-customers" component={withAuthentication(CustomersList)} />
                <Route
                  path="/my-customers/detail/:customerId"
                  component={withAuthentication(CustomerDetails)}
                />
                <Route path="/my-customers/add" component={withAuthentication(NewCustomer)} />
                <Route path="/my-customers/edit/:id" component={withAuthentication(EditCustomer)} />
                <Route exact path="/my-stock" component={withAuthentication(StockList)} />
                <Route
                  exact
                  path="/my-stock/import/orders"
                  component={withAuthentication(StockImportOrdersList)}
                />
                <Route
                  path="/my-stock/import/orders/detail/:id"
                  component={withAuthentication(StockImportOrderDetails)}
                />
              </div>
            </BrowserRouter>
          </ApolloProvider>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
