import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CustomerDatumBase, CustomerDatumLabel, CustomerDatumValue } from './CustomerDatum.styles';

const CustomerDatum = props => {
  const { label, value, children } = props;

  return (
    <CustomerDatumBase>
      {label && (
        <CustomerDatumLabel>
          <FormattedMessage id={label} />
        </CustomerDatumLabel>
      )}
      {value ? <CustomerDatumValue>{value}</CustomerDatumValue> : children}
    </CustomerDatumBase>
  );
};

CustomerDatum.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomerDatum;
