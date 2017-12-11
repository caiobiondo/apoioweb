import React from 'react';
import { FormattedMessage } from 'react-intl';

export const translate = (id, values) => <FormattedMessage id={id} values={values} />;
