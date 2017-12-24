import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ProductImage,
  ProductName,
  ProductCode,
  ValuesWrapper,
  Wrapper,
} from './StockProductInfo.styles';

export default ({ product }) => {
  return (
    <Wrapper>
      <ProductImage imageUrl={product.productImage} width="65px" />
      <ValuesWrapper>
        <ProductName>{product.productName}</ProductName>
        <ProductCode>
          <FormattedMessage id="stockProductCode" values={{ code: product.productCode }} />
        </ProductCode>
      </ValuesWrapper>
    </Wrapper>
  );
};
