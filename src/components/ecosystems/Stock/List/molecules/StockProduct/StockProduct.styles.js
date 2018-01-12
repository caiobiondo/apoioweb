import styled from 'styled-components';
import { gray200 } from 'styles/colors';

const BaseWrapper = styled.div``;

export const StockItemProductImageWrapper = BaseWrapper.extend`
  float: right;
  width: 35%;
  svg {
    margin: 0 35px 0 30px;
    width: 114px;
  }

  img {
    margin: 0 25px 0 15px;
    width: 114px;
  }
`;

export const StockItemProductImageFallback = styled.div`
  svg {
    fill: ${gray200};
    width: 50px;
  }
`;

export const productImageStyles = {
  display: 'inline-block',
  width: '50%',
};
