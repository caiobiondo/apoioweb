import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { fs14 } from 'styles/typography';
import { gray200 } from 'styles/colors';

export const OrderItemDatumWrapper = styled.div`
  flex: 1 1 40%;
  align-self: center;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    display: flex;
    align-self: stretch;
  }
`;

export const OrderItemDatumLabel = styled.div`
  font-size: ${fs14};
  color: ${gray200};
  display: none;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex: 1 1 50%;
    display: inline-block;
  }
`;

export const OrderItemDatumValue = styled.div`
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex: 1 1 50%;
    text-align: end;
  }
`;
