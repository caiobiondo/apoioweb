import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  OrderItemDatumWrapper,
  OrderItemDatumLabel,
  OrderItemDatumValue,
} from './OrderItemDatum.styles';

const OrderItemDatum = props => {
  const { label, value, children } = props;

  return (
    <OrderItemDatumWrapper>
      {label && (
        <OrderItemDatumLabel>
          <FormattedMessage id={label} />
        </OrderItemDatumLabel>
      )}
      {value ? <OrderItemDatumValue>{value}</OrderItemDatumValue> : children}
    </OrderItemDatumWrapper>
  );
};

OrderItemDatum.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
};

export default OrderItemDatum;
