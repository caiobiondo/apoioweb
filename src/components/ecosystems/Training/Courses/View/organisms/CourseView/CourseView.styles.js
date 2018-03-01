import styled from 'styled-components';
import { Responsive, getTheme } from '@entria/components';
import { RobotoRegular } from 'styles/typography';
import { gray450 } from 'styles/colors';

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MylistButtonWrapper = styled.div`
  display: flex;
  border: 2px solid ${getTheme().palette.primary1Color};
  border-radius: 2.5px;
  min-width: 190px;
  height: 50px;

  svg {
    fill: ${getTheme().palette.primary1Color};
    width: 13px;
  }

  button {
    width: 100%;
    > div > button {
      margin: 0 !important;
    }
  }
`;

export const MylistButton = {
  labelStyle: {
    color: getTheme().palette.primary1Color,
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  backgroundColor: gray450,
  hoverColor: gray450,
};
