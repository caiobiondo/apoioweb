import styled from 'styled-components';
import { getTheme } from '@entria/components';
import { RobotoRegular, NaturaBold, fs25 } from 'styles/typography';
import { gray450 } from 'styles/colors';

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MylistButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${getTheme().palette.primary1Color};
  border-radius: 2.5px;
  min-width: 190px;
  height: 50px;

  svg {
    fill: ${getTheme().palette.primary1Color};
    width: 11px;
    height: 11px;
    margin-right: 10px;
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

export const CourseViewFeedbackModalTitle = {
  fontFamily: NaturaBold,
  fontSize: fs25,
};

export const CourseViewFeedbackModalAction = {
  fontFamily: RobotoRegular,
};
