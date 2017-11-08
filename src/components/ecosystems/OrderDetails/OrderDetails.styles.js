import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray200, orange100, black } from 'styles/colors';

export const OrderInfos = styled.div`
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const OrderInfosColumn = styled.div`
  flex: 1 1 auto;

  & + & {
    border-left: 1px solid ${gray200};
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    & + & {
      border-left-width: 0;
      border-top: 1px dotted ${gray200};
    }
  }
`;

export const OrderInfosRow = styled.div`
  padding: 10px;

  & + & {
    border-top: 1px dotted ${gray200};
  }
`;

export const OrderData = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const OrderDataTitle = styled.h2`
  color: ${orange100};
`;

export const OrderDatumShort = styled.div`
  display: flex;
  flex: 0 1 33%;
  flex-direction: column;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumShortMedium = OrderDatumShort.extend`
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 50%;
  }
`;

export const OrderDatumMedium = styled.div`
  display: flex;
  flex: 0 1 50%;
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
  color: ${gray200};
  text-transform: uppercase;
  font-family: Roboto;
`;

export const OrderDatumValue = styled.span`
  color: ${black};
  font-family: Roboto;
`;
