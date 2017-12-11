import styled from 'styled-components';
// import { Responsive } from '@entria/components';
// import { spMedium, spPage } from 'styles/spacing';
import { FormInput as BaseFormInput, FormSelect as BaseFormSelect } from 'natura-ui';

import { RobotoRegular, NaturaBold } from 'styles/typography';

const INPUT_BOTTOM_SPACING = '27px';

export const Wrapper = styled.div``;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: 566px;
  @media (max-width: 566px) {
    width: 100%;
  }
`;

export const FormInput = styled(BaseFormInput)`
  margin-bottom: ${INPUT_BOTTOM_SPACING};
`;

export const FormSelect = styled(BaseFormSelect)`
  margin-bottom: ${INPUT_BOTTOM_SPACING};
`;

export const RowWithHalfInputs = styled.div`
  margin-bottom: ${INPUT_BOTTOM_SPACING};
  display: flex;

  & > * {
    width: 45%;
    display: inline-block;
    margin: 0;

    &:first-child {
      margin-right: 10%;
    }
  }
`;

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

export const PhoneWrapper = styled.div``;

export const FormButtonsWrapper = styled.div`
  text-align: center;

  & > * {
    display: inline-block;
    margin-right: 30px !important;
  }

  & > *:last-child {
    margin-right: 0;
  }

  button {
    color: white;
    text-align: center;
  }

  button div {
    text-align: center !important;
    display: inline !important;
  }
`;

export const PageTitle = styled.h1`
  color: #f3971f;
  font-size: 43px;
  font-family: ${NaturaBold};
  width: 100%;
  text-align: center;
  margin-bottom: 47px;
`;

export const PageText = styled.p`
  text-align: center;
  font-size: 16px;
  font-family: ${RobotoRegular};
  color: #333;
  margin-bottom: 113px;
`;
