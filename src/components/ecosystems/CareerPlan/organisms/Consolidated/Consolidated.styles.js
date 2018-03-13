import styled from 'styled-components';

import {
  IndicatorWeightWrapper,
  IndicatorTableHeader,
  IndicatorTableContent,
} from '../Indicator/Indicator.styles';

import {
  IndicatorDataContent,
  IndicatorDataRowAcc,
} from '../../molecules/IndicatorDataForm/IndicatorDataForm.styles';

export const ConsolidatedWrapper = styled.div`
  ${IndicatorTableHeader} {
    margin-top: 110px;
  }

  ${IndicatorTableContent} {
    padding: 15px 0 10px;
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
    padding-top: 35px;
  }

  ${IndicatorDataRowAcc} {
    min-height: 45px;
  }
`;
