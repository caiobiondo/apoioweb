import styled from 'styled-components';
import { Responsive } from '@entria/components';

export const OrderInformations = styled.div`
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const OrderData = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const OrderDataTitle = styled.h2`
  color: #f4a652;
`;

export const OrderDatumShort = styled.div`
  display: flex;
  flex: 1 1 33%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumMedium = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumLong = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
`;

export const OrderDatumLabel = styled.label`
  color: #bbbbbb;
  text-transform: uppercase;
  font-family: Roboto;
`;

export const OrderDatumValue = styled.span`
  color: #000;
  font-family: Roboto;
`;
