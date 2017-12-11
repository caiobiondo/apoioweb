import styled from 'styled-components';
import { RobotoLight, RobotoRegular } from 'styles/typography';
import { FormText as BaseFormText } from 'natura-ui';

export const Wrapper = styled.div``;

export const Title = styled.h3`
  color: #f3971f;
  margin-bottom: 54px;
  font-family: ${RobotoLight};
  font-size: 21px;
  font-weight: 100;
`;

export const HelpText = styled.p`
  font-family: ${RobotoRegular};
  font-size: 16px;
  margin-bottom: 47px;
  color: rgba(119, 119, 119, 0.8);
`;

export const FormText = styled(BaseFormText)`
  height: 205px;
`;
