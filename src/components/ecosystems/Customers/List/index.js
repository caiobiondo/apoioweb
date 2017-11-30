import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import { Main, OrderAddButtonContainer } from './Orders.styles';

class CustomersListWrapper extends Component {
  constructor(props) {
    super(props);
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  state = {
    empty: false,
    customerSelected: false,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  selectCustomer(customers) {
    this.setState({ customerSelected: customers.length });
  }

  render() {
    const { loading, customerSelected } = this.state;
    return (
      <Main loading={loading}>
        <OrderAddButtonContainer remove={customerSelected}>
          <CustomerButton remove={customerSelected} />
        </OrderAddButtonContainer>
        <CustomersList select={this.selectCustomer} />
      </Main>
    );
  }
}

export default CustomersListWrapper;
