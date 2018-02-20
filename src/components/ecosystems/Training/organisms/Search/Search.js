import React from 'react';
import { Paper } from 'natura-ui';
import BaseSearch from 'components/molecules/BaseSearch';
import { Wrapper } from './Search.styles';

class Search extends BaseSearch {
  render() {
    return (
      <Paper style={Wrapper}>
        <h1>Search</h1>
      </Paper>
    );
  }
}

export default Search;
