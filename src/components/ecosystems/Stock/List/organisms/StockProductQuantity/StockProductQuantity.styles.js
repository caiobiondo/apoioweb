import styled from 'styled-components';
import { FormButton } from 'natura-ui';
import { successGreen } from 'styles/colors';
// import ImageWithFallback from 'components/molecules/ImageWithFallback';
import { fs9, RobotoRegular } from 'styles/typography';

export const Wrapper = styled.span``;

export const SubmittedMessage = styled.div`
  text-align: center;
  font-family: ${RobotoRegular};
  font-size: ${fs9} !important;
  font-weight: bold;
  color: ${successGreen};
  height: 25px;
  line-height: 25px;
  width: 87px;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-transform: uppercase;

  & svg {
    fill: ${successGreen};
    width: 6px;
    margin-bottom: 1px;
    margin-right: 6px;
  }
`;

// D=
export const Button = styled(FormButton)`
  & > div,
  & > div > button,
  & > div > button > div,
  & > div > button > div > div {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    font-family: ${RobotoRegular};
    font-size: ${fs9} !important;
    font-weight: bold;
    height: 25px !important;
    min-width: 89px !important;
    width: 89px !important;
    text-transform: uppercase;
  }
`;
