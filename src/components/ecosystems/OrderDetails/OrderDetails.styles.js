import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray200, orange100, black } from 'styles/colors';
import { fs10, fs18 } from 'styles/typography';

export const OrderInfos = styled.div`
  display: flex;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const OrderInfosColumn = styled.div`
  flex: 1 1 60%;

  & + & {
    border-left: 1px solid ${gray200};
    flex-basis: 40%;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    & + & {
      border-left-width: 0;
      border-top: 1px dotted ${gray200};
      flex-basis: auto;
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
  font-family: Roboto-Regular;
`;

export const OrderDataTitle = styled.div`
  color: ${orange100};
  font-size: ${fs18};
  margin-bottom: 26.5px;
`;

export const OrderDatum = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

export const OrderDatumShort = OrderDatum.extend`
  flex: 0 1 33%;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumShortMedium = OrderDatumShort.extend`
  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 50%;
  }
`;

export const OrderDatumMedium = OrderDatum.extend`
  flex: 0 1 50%;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumLong = OrderDatum.extend`
  flex: 1 1 100%;
`;

export const OrderDatumLabel = styled.label`
  color: ${gray200};
  text-transform: uppercase;
  font-size: ${fs10};
  margin-bottom: 13.5px;
`;

export const OrderDatumValue = styled.span`
  color: ${black};
  font-size: ${fs18};
`;
