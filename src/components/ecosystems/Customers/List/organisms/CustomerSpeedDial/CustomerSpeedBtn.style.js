import styled from 'styled-components';
import { RobotoRegular } from 'styles/typography';
import { FormInput as BaseFormInput } from 'natura-ui';
import { Responsive } from '@entria/components';
import { white } from 'styles/colors';

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
  align-items: flex-end;
  display: flex;
  margin-right: 10px;

  width: 119px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.24);
  background-color: #ffffff;

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
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  width: 119,
  height: 40,
  backgroundColor: '#FFF',
};

export const FormInput = styled(BaseFormInput)`
  flex: 1 1 auto;
`;

export const BaseFormSearchDescription = styled.div`
  font-family: ${RobotoRegular};
  margin: 16px 0;
`;
