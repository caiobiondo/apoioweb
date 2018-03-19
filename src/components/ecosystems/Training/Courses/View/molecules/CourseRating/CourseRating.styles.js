import styled from 'styled-components';
import { fs10, fs14, RobotoRegular, NaturaRegular } from 'styles/typography';
import { getTheme } from '@entria/components';
import { gray200, gray700 } from 'styles/colors';

export const TittleWrapper = styled.div`
  font-size: ${fs10};
  font-family: ${RobotoRegular};
  color: ${getTheme().palette.primary1Color};
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const TimeWrapper = styled.div`
  font-size: ${fs14};
  font-family: ${NaturaRegular};
  color: ${gray700};
`;

export const ColWrapper = styled.div`
  height: 50px;
  padding-right: 25px;

  & + & {
    border-left: 1px solid ${gray200};
    padding-left: 25px;
  }
`;

export const RatingWrapper = styled.div`
  div {
    display: flex;
  }
`;

export const RowWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  padding-left: 10px;
`;

export const RatingStyles = {
  itemIconStyle: {
    width: '15',
    height: '15',
  },
  itemStyle: {
    width: '15',
    height: '15',
    padding: '0',
  },
};
