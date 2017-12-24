import styled from 'styled-components';
import { FormInput as BaseFormInput } from 'natura-ui';
import { Responsive } from '@entria/components';

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

  button {
    color: white;
    text-align: center;
    text-transform: uppercase;
  }

  button div {
    display: inline !important;
  }

  > div > div {
    > button {
      height: 54px !important;
    }
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    margin-top: 20px;

    > div,
    > div > div {
      width: 100%;
    }
  }
`;

export const FormInput = styled(BaseFormInput)`
  flex: 1;
`;
