import styled from 'styled-components';
import { gray200 } from 'styles/colors';

import {
  IndicatorWeightWrapper,
  IndicatorTableHeader,
  IndicatorTableContent,
} from '../Indicator/Indicator.styles';

import { IndicatorDataRowFeatured } from '../../molecules/IndicatorData/IndicatorData.styles';

import {
  IndicatorDataContent,
  IndicatorDataRowAcc,
} from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export const ConsolidatedWrapper = styled.div`
  width: 100%;

  ${IndicatorTableHeader} {
    margin-top: 116px;
  }

  ${IndicatorWeightWrapper} {
    > img {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
    }
  }

  ${IndicatorDataContent} {
    padding: 45px 0 35px;
  }

  ${IndicatorDataRowAcc} {
    min-height: 45px;
  }

  ${IndicatorDataRowFeatured} {
    display: block;
    width: 100%;
    line-height: 25px;
  }
`;

export const ConsolidateWarningIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: calc(50% + 20px);
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    width: 18px;
    height: 18px;
    fill: ${gray200};
  }
`;
