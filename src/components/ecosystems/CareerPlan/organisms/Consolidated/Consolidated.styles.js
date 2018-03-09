import styled from 'styled-components';

import { IndicatorTableContentWapper } from '../Indicator/Indicator.styles';

import {
  IndicatorDataContent,
  IndicatorDataRowAcc,
} from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export const ConsolidatedWrapper = styled.div`
  ${IndicatorTableContentWapper} {
    &:before {
      top: 95px;
    }
  }

  ${IndicatorDataContent} {
    padding-top: 35px;
  }

  ${IndicatorDataRowAcc} {
    min-height: 45px;
  }
`;
