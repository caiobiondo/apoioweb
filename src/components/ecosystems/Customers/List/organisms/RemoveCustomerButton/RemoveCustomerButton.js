import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { CustomersListQuery } from '../CustomersList/CustomersList.data';

import { OrderAddButtonContainer } from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

class RemoveCustomerButton extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const customersIdToBeRemoved = nextProps.selected.map(({ id }) => id);
    if (nextProps.selected.length) {
      this.props
        .mutate({
          variables: { input: { ids: customersIdToBeRemoved } },
          optimisticResponse: {
            removeCustomers: { ids: customersIdToBeRemoved },
          },
          update: (store, { data: { removeCustomers } }) => {
            const data = store.readQuery({ query: CustomersListQuery });
            data.customers = data.customers.filter(
              ({ id }) => !customersIdToBeRemoved.includes(id),
            );
            store.writeQuery({ query: CustomersListQuery, data });
          },
          // refetchQueries: [{ query: CustomersListQuery }],
        })
        .then(() => {
          console.log('uhul!');
        });
    }
  }

  render() {
    console.log(this.props);
    return (
      <OrderAddButtonContainer remove={this.props.remove}>
        {this.props.children}
      </OrderAddButtonContainer>
    );
  }
}

export const RemoveCustomerButtonWithIntl = injectIntl(RemoveCustomerButton);
export default graphql(RemoveCustomersMutation)(RemoveCustomerButtonWithIntl);
