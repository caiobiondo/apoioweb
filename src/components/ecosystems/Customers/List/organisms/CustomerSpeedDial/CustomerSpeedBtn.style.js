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
  margin-right: 37px;
  margin-top: 12px;

  width: auto;
  height: 40px;
  border-radius: 6px;
  background-color: #ffffff;

  button {
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.24) !important;
    font-family: ${RobotoRegular};
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.75;
    letter-spacing: 0.1px;
    text-align: right;
    color: #333;
    width: auto;
    min-width: auto !important;
  }

  button > div,
  button > div > div,
  button > div > div > span {
    text-transform: lowercase !important;
    width: auto;
    min-width: auto !important;
  }

  button > div > div > span::first-letter {
    text-transform: uppercase !important;
  }

  @media (max-width: ${Responsive.VIEWPORT.MEDIUM}px) {
    margin-left: 0;
    margin-top: 20px;

    button,
    > div,
    > div > div {
      width: 100%;
      box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.24);
    }

    > div > button > div {
      flex: 1 1 auto;
    }
  }
`;

export const searchButtonStyles = {
  labelStyle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Regular',
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
