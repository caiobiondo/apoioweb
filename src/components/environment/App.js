/* eslint-disable import */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import {
  GRAPHQL_URI,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  CNO_TOKEN_LOCAL_STORAGE_KEY,
  PERSON_ID_LOCAL_STORAGE_KEY,
  ROUTE_PREFIX,
} from 'config';

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
  PERSON_ID_LOCAL_STORAGE_KEY,
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
                  path={`${ROUTE_PREFIX}/my-orders`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Orders/List'),
                    'orders',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-orders/detail/:id`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Orders/Details'),
                    'orders',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-score`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/MyScore'),
                    'myScore',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/my-customers`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/List'),
                    'customers',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-customers/detail/:customerId`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Details'),
                    'customers',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-customers/add`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Form/New'),
                    'customers',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-customers/edit/:id`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Customers/Form/Edit'),
                    'customers',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/my-stock`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/List'),
                    'stock',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/my-stock/import/orders`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/Import/organisms/List/List'),
                    'stock',
                  )}
                />
                <Route
                  path={`${ROUTE_PREFIX}/my-stock/import/orders/detail/:id`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Stock/Import/organisms/Details/Details'),
                    'stock',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/magazines/:type`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Magazines/List'),
                    'magazine',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/magazines/view/:type/:id`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Magazines/View'),
                    'magazine',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/recommendations`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Recommendations/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/courses`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Courses/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/courses/:id/:type`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Courses/View'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/courses/:id/:type/:scormId`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Courses/View'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/certificates`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Certificates/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/categories`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Categories/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/categories/:id`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/Categories/Details'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/training/my-list`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/Training/MyList/List'),
                    'training',
                  )}
                />
                <Route
                  exact
                  path={`${ROUTE_PREFIX}/person/:id/careerPlan`}
                  component={withDefaultBehaviour(
                    import('components/ecosystems/CareerPlan'),
                    'careerPlan',
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
