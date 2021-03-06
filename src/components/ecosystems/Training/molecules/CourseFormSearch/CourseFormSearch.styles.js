import styled from 'styled-components';
import { RobotoRegular } from 'styles/typography';
import { FormInput as BaseFormInput, FormSelect as BaseSelect } from 'natura-ui';
import { Responsive } from '@entria/components';
import { white } from 'styles/colors';

export const Wrapper = {
  padding: 30,
};

export const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  font-family: ${RobotoRegular};

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    flex-direction: column;
  }
`;

export const FormInputWrapper = styled.div`
  align-items: flex-center;
  display: flex;
  margin-left: 20px;
  flex: 3;

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    margin-top: 20px;

    input select,
    > div,
    > div > div {
      width: 100%;
    }
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

    > div > button > div {
      flex: 1 1 auto;
    }
  }
`;

export const searchButtonStyles = {
  labelStyle: {
    color: white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  height: 54,
};

export const FormInput = styled(BaseFormInput)`
  flex: 1 1 auto;
`;

export const FormSelect = styled(BaseSelect)`
  flex: 1 1 auto;
`;

export const BaseFormSearchDescription = styled.div`
  font-family: ${RobotoRegular};
  margin: 16px 0;
`;
