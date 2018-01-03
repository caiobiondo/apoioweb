import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray200, gray890 } from 'styles/colors';
import { fs12, fs14 } from 'styles/typography';

export const OrderItemWrapper = styled.div`
  font-family: Roboto-Regular;
  padding-top: 20px;
  border-top: 1px solid ${gray150};
  margin-top: 20px;

  display: flex;
  height: 128px;
  vertical-align: middle;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-direction: column;
    height: auto;
  }
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
