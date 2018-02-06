import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ProductImage,
  ProductName,
  ProductCode,
  ValuesWrapper,
  Wrapper,
} from './StockProductInfo.styles';

const capitalizeFirtLetter = name => {
  let newName = '';
  if (!name) return name;
  name
    .trim()
    .toLowerCase()
    .split(' ')
    .forEach(string => (newName += string.charAt(0).toUpperCase() + string.slice(1) + ' '));
  return newName;
};

export default ({ product }) => {
  return (
    <Wrapper>
      <ProductImage imageUrl={product.productImage} width="65px" />
      <ValuesWrapper>
        <ProductName>{capitalizeFirtLetter(product.productName)}</ProductName>
        <ProductCode>
          <FormattedMessage id="stockProductCode" values={{ code: product.productCode }} />
        </ProductCode>
      </ValuesWrapper>
    </Wrapper>
  );
};
