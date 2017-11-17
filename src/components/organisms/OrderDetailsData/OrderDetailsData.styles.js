import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray200, gray600, gray890, orange100 } from 'styles/colors';
import { fs10, fs18 } from 'styles/typography';

export const OrderDetailsCard = styled.div`
  > div {
    padding: 30px;
  }
`;

export const OrderInfos = styled.div`
  display: flex;
  padding-top: 36px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const OrderInfosRow = styled.div`
  padding: 10px;

  & + & {
    border-top: 1px dotted ${gray150};
    padding-top: 36px;
    padding-bottom: 4px;
  }
`;

export const OrderInfosColumn = styled.div`
  flex: 1 1 60%;

  & + & {
    border-left: 1px solid ${gray150};
    flex-basis: 40%;

    ${OrderInfosRow} {
      padding-left: 65.5px;
      padding-right: 10px;
    }
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    & + & {
      border-left-width: 0;
      border-top: 1px dotted ${gray150};
      flex-basis: auto;

      ${OrderInfosRow} {
        padding-left: 0;
      }
    }
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
  color: ${gray600};
  font-size: ${fs18};

  & + & {
    margin-top: 13.5px;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
`;

export const SectionTitleSymbol = styled.div`
  margin-right: 20px;
  display: inline-block;

  svg {
    fill: ${orange100};
    width: 100%;
    height: auto;
  }
`;

export const SectionTitleLabel = styled.span`
  vertical-align: middle;
  font-size: ${fs18};
  color: ${gray890};
`;
