import React, { Component } from 'react';
// import { Wrapper } from './List.styles';
import EmptyList from 'components/molecules/EmptyList/EmptyList';

export const StockList = props => {
  return (
    <EmptyList
      icon="ico_forklift"
      titleId="stockEmptyList"
      descriptionId="stockEmptyListDescription"
    />
  );
};

export default StockList;
