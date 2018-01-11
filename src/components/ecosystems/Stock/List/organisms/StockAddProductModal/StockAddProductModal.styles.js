import styled from 'styled-components';
import { gray200 } from 'styles/colors';

const BaseWrapper = styled.div``;

export const StockItemProductImageWrapper = BaseWrapper.extend`
  float: right;
  width: 35%;
  svg {
    margin: 0 35px 0 30px;
    width: 50px;
  }

  img {
    margin: 0 25px 0 15px;
    width: 75px;
  }
`;

export const FormWrapper = BaseWrapper.extend`
  float: left;
  width: 55%;
`;

export const StockItemProductImageFallback = styled.div`
  svg {
    fill: ${gray200};
    width: 50px;
  }
`;

export const FormButtonWrapper = styled.div`
  margin-top: 54px;
`;

export const FormButtonStyles = {
  marginTop: 54,
};
