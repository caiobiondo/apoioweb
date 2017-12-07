import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { CustomersListQuery } from '../CustomersList/CustomersList.data';

import { OrderAddButtonContainer } from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

class RemoveCustomerButton extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.selected.length) {
      this.props.mutate({
        variables: { input: { ids: nextProps.selected.map(({ id }) => id) } },
        refetchQueries: [{ query: CustomersListQuery }],
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
