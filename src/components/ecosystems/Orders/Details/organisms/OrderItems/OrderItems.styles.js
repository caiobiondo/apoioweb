import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray200, gray890 } from 'styles/colors';
import { fs12, fs18 } from 'styles/typography';
import { spMedium } from 'styles/spacing';

export const OrderDetailsWrapper = {
  padding: '30px',
  marginBottom: spMedium,
};

export const OrderItemsHeader = styled.div`
  font-family: Roboto-Regular;
  font-size: ${fs12};
  text-transform: uppercase;
  color: ${gray200};
  display: flex;
  align-items: center;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    display: none;
  }
`;

export const OrderItemsInfos = styled.div`
  display: block;
`;

export const OrderItemsQuantityWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: ${fs18};
  color: ${gray890};
`;

export const OrderItemsQuantity = styled.span`
  margin-left: 10px;
`;

export const OrderItemsHeaderProductDescription = styled.div`
  flex: 1 1 40%;
`;

export const OrderItemsHeaderProductValuesWrapper = styled.div`
  flex: 1 1 60%;
  text-align: center;
  display: flex;
`;

export const OrderItemsHeaderProductValueLabel = styled.div`
  flex: 1 1 33%;
`;

export const dialogContentStyle = {
  maxWidth: '450px',
};
