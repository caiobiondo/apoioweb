import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray200, gray890 } from 'styles/colors';
import { fs12, fs14, fs18 } from 'styles/typography';
import { spMedium } from 'styles/spacing';

export const OrderDetailsWrapper = {
  padding: '30px',
  marginBottom: spMedium,
};

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

export const OrderItem = styled.div`
  display: flex;
  height: 128px;
  vertical-align: middle;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-direction: column;
    height: auto;
  }
`;

export const OrderItemWrapper = styled.div`
  font-family: Roboto-Regular;
  padding-top: 20px;
  border-top: 1px solid ${gray150};
  margin-top: 20px;
`;

export const OrderItemProductDataWrapper = styled.div`
  display: flex;
  flex: 1 1 60%;
  align-self: center;
  text-align: center;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-direction: column;
    align-self: stretch;
    text-align: initial;
    flex-basis: auto;
  }
`;

export const OrderItemProductDescriptionWrapper = styled.div`
  flex: 1 1 40%;
  align-self: center;
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    align-self: stretch;
    flex-basis: auto;
    margin-bottom: 15px;
  }
`;

export const OrderItemProductDescriptionCode = styled.div`
  font-size: ${fs14};
  color: ${gray890};
  margin-bottom: 7px;
  display: flex;
  align-self: center;
  flex-direction: column;
`;

export const OrderItemProductDescription = styled.div`
  margin-bottom: 10px;
`;

export const OrderItemProductCode = styled.div`
  font-size: ${fs12};
  color: ${gray200};
`;

export const OrderItemProductImageWrapper = styled.div`
  svg {
    margin: 0 35px 0 30px;
    width: 50px;
  }

  img {
    margin: 0 25px 0 15px;
    width: 75px;
  }
`;

export const OrderItemProductImageFallback = styled.div`
  svg {
    fill: ${gray200};
    width: 50px;
  }
`;

export const OrderItemImportButtonWrapper = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    margin: 0 auto;
  }
`;

export const orderItemImportButtonStyles = {
  labelStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: '10px',
  },
  buttonStyle: {
    minWidth: '90px',
  },
  overlayStyle: {
    minWidth: '90px',
  },
  height: '25px',
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
