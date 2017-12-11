import React from 'react';
import { FormText } from 'natura-ui';
import { Wrapper, Title, HelpText } from './NotesForm.styles';
import { translate } from '../../Shared/Utils';

import { withFormik } from 'formik';
import { FormattedMessage } from 'react-intl';

const InnerForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors = {},
}) => {
  return (
    <Wrapper>
      <Title>
        <FormattedMessage id="formCustomerNotes" />
      </Title>

      <HelpText>
        <FormattedMessage id="formCustomerNotesText" />
      </HelpText>

      <FormText
        type="text"
        name="notes"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerNotes')}
        value={values.notes}
      />
    </Wrapper>
  );
};

const NotesForm = withFormik({
  mapPropsToValues: props => props.customer,
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    debugger;
    console.log(values);
  },
})(InnerForm);

export default NotesForm;
