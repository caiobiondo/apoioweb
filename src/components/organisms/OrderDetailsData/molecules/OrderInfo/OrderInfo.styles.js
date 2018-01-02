import styled from 'styled-components';
import { Responsive } from '@entria/components';
import { gray150, gray200, gray890, orange100 } from 'styles/colors';
import { fs12, fs14, fs18 } from 'styles/typography';
import { spMedium } from 'styles/spacing';

export const OrderDetailsWrapper = {
  padding: '30px',
  marginBottom: spMedium,
};

export const OrderInfos = styled.div`
  display: flex;

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
        padding-left: 10px;
        padding-top: 36px;
        padding-bottom: 4px;
      }
    }
  }
`;

export const OrderData = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Roboto-Regular;

  & + & {
    padding-top: 32px;
    border-top: 1px dotted ${gray150};
  }
`;
