import styled from 'styled-components';

import { IndicatorWeightWrapper, IndicatorTableHeader } from '../Indicator/Indicator.styles';

import { IndicatorDataRowFeatured } from '../../molecules/IndicatorData/IndicatorData.styles';

import {
  IndicatorDataContent,
  IndicatorDataRowAcc,
} from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export const ConsolidatedIndicatorWrapper = styled.div`
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
    line-height: 25px;
    width: 100%;
  }
`;
