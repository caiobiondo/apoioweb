import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { fs18, fs10 } from 'styles/typography';
import { gray600, gray200 } from 'styles/colors';

export const OrderDatumBase = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;

  flex: 0 1 auto;
`;

export const OrderDatumShort = OrderDatumBase.extend`
  flex: 0 1 33%;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumMedium = OrderDatumBase.extend`
  flex: 0 1 50%;

  @media (max-width: ${Responsive.VIEWPORT.SMALL}px) {
    flex-basis: 100%;
  }
`;

export const OrderDatumLong = OrderDatumBase.extend`
  flex: 1 1 100%;
`;

export const OrderDatumLabel = styled.label`
  color: ${gray200};
  text-transform: uppercase;
  font-size: ${fs10};
  margin-bottom: 13.5px;
  padding-right: 10px;
`;

export const OrderDatumValue = styled.span`
  color: ${gray600};
  font-size: ${fs18};

  & + & {
    margin-top: 5px;
  }
`;
