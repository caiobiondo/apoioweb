import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  OrderDatum,
  OrderDatumShort,
  OrderDatumShortMedium,
  OrderDatumMedium,
  OrderDatumLong,
  OrderDatumLabel,
  OrderDatumValue,
} from './OrderDatum.styles';

const SectionTitle = props => {
  const { type, label, value } = props;

  const OrderDatumContent = Wrapper => {
    return (
      <Wrapper>
        <OrderDatumLabel>
          <FormattedMessage id={label} />
        </OrderDatumLabel>
        <OrderDatumValue>{value}</OrderDatumValue>
      </Wrapper>
    );
  };

  switch (type) {
    case 'short':
      return OrderDatumContent(OrderDatumShort);
    case 'shortMedium':
      return OrderDatumContent(OrderDatumShortMedium);
    case 'medium':
      return OrderDatumContent(OrderDatumMedium);
    case 'long':
      return OrderDatumContent(OrderDatumLong);
    default:
      return OrderDatumContent(OrderDatum);
  }
};

SectionTitle.propTypes = {
  iconName: PropTypes.string,
};

export default SectionTitle;
