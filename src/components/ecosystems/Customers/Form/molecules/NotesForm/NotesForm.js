import React from 'react';
import { Wrapper, Title, HelpText, FormText } from './NotesForm.styles';
import { translate } from '../../Shared/Utils';

import { FormattedMessage } from 'react-intl';

const NotesForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  errors = {},
}) => {
  values = values.customer || {};

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
        name="customer.comment"
        onChange={handleChange}
        onBlur={handleBlur}
        label={translate('formCustomerNotes')}
        value={values.comment}
      />
    </Wrapper>
  );
};

export default NotesForm;
