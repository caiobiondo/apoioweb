/* eslint-disable import */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

import withDefaultBehaviour from 'hocs/withDefaultBehaviour';

import { ThemeProvider, theme, setupGlobals, setupFonts } from 'natura-ui';
import { locale, flattenMessages, messages } from 'locale/index';

import authLink from 'apolloLinks/authLink';

setupGlobals();
setupFonts();

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
                <Route
                  exact
                  path="/my-orders"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Orders/List'),
                    'orders',
                  )}
                />
                <Route
                  path="/my-orders/detail/:id"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Orders/Details'),
                    'orders',
                  )}
                />
                <Route
                  path="/my-score"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/MyScore'),
                    'myScore',
                  )}
                />
                <Route
                  exact
                  path="/my-customers"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/List'),
                    'customers',
                  )}
                />
                <Route
                  path="/my-customers/detail/:customerId"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Details'),
                    'customers',
                  )}
                />
                <Route
                  path="/my-customers/add"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Form/New'),
                    'customers',
                  )}
                />
                <Route
                  path="/my-customers/edit/:id"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Form/Edit'),
                    'customers',
                  )}
                />
                <Route
                  exact
                  path="/my-stock"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/List'),
                    'stock',
                  )}
                />
                <Route
                  exact
                  path="/my-stock/import/orders"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/Import/organisms/List/List'),
                    'stock',
                  )}
                />
                <Route
                  path="/my-stock/import/orders/detail/:id"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/Import/organisms/Details/Details'),
                    'stock',
                  )}
                />
                <Route
                  exact
                  path="/magazines/:type"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Magazines/List'),
                    'magazine',
                  )}
                />
                <Route
                  exact
                  path="/magazines/view/:type/:id"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Magazines/View'),
                    'magazine',
                  )}
                />
                <Route
                  exact
                  path="/training/courses"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Courses/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path="/training/certificates"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Certificates/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path="/training/categories"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Categories/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path="/training/my-list"
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Mylist/List'),
                    'training',
                  )}
                />
              </div>
            </BrowserRouter>
          </ApolloProvider>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
