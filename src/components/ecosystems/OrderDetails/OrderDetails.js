import React, { Component } from 'react';

class OrderDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <h2>Meu pedido #{id}</h2>
        <p>Infos do pedido</p>
      </div>
    );
  }
}

export default OrderDetails;
