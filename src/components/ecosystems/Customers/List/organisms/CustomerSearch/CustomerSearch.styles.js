import styled from 'styled-components';
import { RobotoMedium, RobotoRegular } from 'styles/typography';
import { FormInput as BaseFormInput } from 'natura-ui';
import { Responsive } from '@entria/components';

export const Wrapper = {
  padding: 30,
};

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${RobotoRegular};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const FormButtonWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const formButtonStyles = {
  height: '54px',
  labelStyle: {
    fontFamily: RobotoMedium,
  },
};

export const FormInput = styled(BaseFormInput)`
  flex: 1;
`;

export const CustomerSearchDescription = styled.div`
  font-family: ${RobotoRegular};
  margin: 16px 0;
`;
