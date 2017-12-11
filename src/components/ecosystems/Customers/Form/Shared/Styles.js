import styled from 'styled-components';
import { FormInput as BaseFormInput, FormSelect as BaseFormSelect } from 'natura-ui';

export const INPUT_BOTTOM_SPACING = '27px';

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

export const FormInput = styled(BaseFormInput)`
  margin-bottom: ${INPUT_BOTTOM_SPACING};
`;

export const FormSelect = styled(BaseFormSelect)`
  margin-bottom: ${INPUT_BOTTOM_SPACING};
`;
