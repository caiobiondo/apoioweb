import styled from 'styled-components';
import { RobotoRegular } from 'styles/typography';

export const CustomerPhoneHelpTextWrapper = styled.span`
  font-size: 14px;
  font-family: ${RobotoRegular};
  color: #a9a9a9;
`;

export const AddPhoneButton = styled.a`
  border-bottom-style: solid;
  border-color: #ddd;
  border-top-style: solid;
  border-width: 2px;
  color: #bbb;
  cursor: pointer;
  display: block;
  font-family: ${RobotoRegular};
  margin: 23px 0 68px;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const AddPhoneIconWrapper = styled.div`
  display: inline-block;
  margin-right: 25px;

  svg {
    height: 12px;
    width: 12px;
    fill: #bbbbbb;
    transform: rotate(45deg);
  }
`;

export const Wrapper = styled.div``;
