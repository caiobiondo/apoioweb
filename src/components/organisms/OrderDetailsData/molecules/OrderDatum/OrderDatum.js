import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  OrderDatumBase,
  OrderDatumShort,
  OrderDatumMedium,
  OrderDatumLong,
  OrderDatumLabel,
  OrderDatumValue,
} from './OrderDatum.styles';

const OrderDatum = props => {
  const { type, label, value, children } = props;

  const OrderDatumContent = Wrapper => {
    return (
      <Wrapper>
        {label && (
          <OrderDatumLabel>
            <FormattedMessage id={label} />
          </OrderDatumLabel>
        )}
        {value ? <OrderDatumValue>{value}</OrderDatumValue> : children}
      </Wrapper>
    );
  };

  switch (type) {
    case 'short':
      return OrderDatumContent(OrderDatumShort);
    case 'medium':
      return OrderDatumContent(OrderDatumMedium);
    case 'long':
      return OrderDatumContent(OrderDatumLong);
    default:
      return OrderDatumContent(OrderDatumBase);
  }
};

OrderDatum.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default OrderDatum;
