import React, { Component } from 'react';

import ListTable from '../ListTable';
import ListSearch from '../ListSearch';
import { Wrapper } from './List.styles';

class StockList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productSearch: '',
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(productSearch) {
    this.setState({ productSearch });
  }

  render() {
    return (
      <Wrapper>
        <ListSearch onSearch={this.onSearch} />
        <ListTable productSearch={this.state.productSearch} />
      </Wrapper>
    );
  }
}

export default StockList;
