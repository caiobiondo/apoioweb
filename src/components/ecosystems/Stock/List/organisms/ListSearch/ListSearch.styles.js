import styled from 'styled-components';
import { FormInput as BaseFormInput } from 'natura-ui';
import { Responsive } from '@entria/components';
import { white } from 'styles/colors';

export const Wrapper = {
  padding: 30,
  marginBottom: '18px',
};

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const FormButtonWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin-left: 20px;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    margin-top: 20px;

    button,
    > div,
    > div > div {
      width: 100%;
    }
  }
`;

export const searchButtonStyles = {
  labelStyle: {
    color: white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Regular',
  },
  height: 54,
};

export const FormInput = styled(BaseFormInput)`
  flex: 1;
`;
