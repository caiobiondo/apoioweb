import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

import Orders from 'components/ecosystems/Orders/List';
import OrderDetails from 'components/ecosystems/Orders/Details';
import MyScore from 'components/ecosystems/MyScore';
import CustomerDetails from 'components/ecosystems/Customers/Details';
import CustomersList from 'components/ecosystems/Customers/List';
import { EditCustomer, NewCustomer } from 'components/ecosystems/Customers/Form';
import StockList from 'components/ecosystems/Stock/List';
import StockImportOrdersList from 'components/ecosystems/Stock/Import/organisms/List/List';
import StockImportOrderDetails from 'components/ecosystems/Stock/Import/organisms/Details/Details';

import withDefaultBehaviour from 'hocs/withDefaultBehaviour';

import { ThemeProvider, theme, setupGlobals, setupFonts } from 'natura-ui';
import { locale, flattenMessages, messages } from 'locale/index';

import authLink from 'apolloLinks/authLink';

setupGlobals();
setupFonts();

const LOGIN_PATH = '/login';
const API_AUTH_ERROR_MSG = '#REDIRECT_TO_LOGIN#';

const client = new ApolloClientCreator(
  GRAPHQL_URI,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  CNO_TOKEN_LOCAL_STORAGE_KEY,
).create([authLink]);

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <div>
                <Route exact path="/my-orders" component={withDefaultBehaviour(Orders, 'orders')} />
                <Route
                  path="/my-orders/detail/:id"
                  component={withDefaultBehaviour(OrderDetails, 'orders')}
                />
                <Route path="/my-score" component={withDefaultBehaviour(MyScore, 'myScore')} />
                <Route
                  exact
                  path="/my-customers"
                  component={withDefaultBehaviour(CustomersList, 'customers')}
                />
                <Route
                  path="/my-customers/detail/:customerId"
                  component={withDefaultBehaviour(CustomerDetails, 'customers')}
                />
                <Route
                  path="/my-customers/add"
                  component={withDefaultBehaviour(NewCustomer, 'customers')}
                />
                <Route
                  path="/my-customers/edit/:id"
                  component={withDefaultBehaviour(EditCustomer, 'customers')}
                />
                <Route
                  exact
                  path="/my-stock"
                  component={withDefaultBehaviour(StockList, 'customers')}
                />
                <Route
                  exact
                  path="/my-stock/import/orders"
                  component={withDefaultBehaviour(StockImportOrdersList, 'customers')}
                />
                <Route
                  path="/my-stock/import/orders/detail/:id"
                  component={withDefaultBehaviour(StockImportOrderDetails, 'customers')}
                />
              </div>
            </BrowserRouter>
          </ApolloProvider>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
