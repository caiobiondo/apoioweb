import React from 'react';
import PropTypes from 'prop-types';
import { FormButton } from 'natura-ui';
import { FormattedMessage } from 'react-intl';

import { Header, Body, Status } from './Order.styles';

import CustomCard from '../CustomCard/CustomCard';

const renderFields = fields => {
  if (!fields) {
    return null;
  }

  return Object.keys(fields)
    .filter(key => fields[key])
    .map(key => (
      <div key={key}>
        <label>
          <FormattedMessage id={key} />
        </label>
        <div>{fields[key]}</div>
      </div>
    ));
};

const Order = ({ color, left, middle, right }) => (
  <CustomCard color={color}>
    <CustomCard.Section>
      <Header>{renderFields(left.header)}</Header>
      <Body>{renderFields(left.body)}</Body>
    </CustomCard.Section>

    <CustomCard.Section>
      <Header>{renderFields(middle.header)}</Header>
      <Body>{renderFields(middle.body)}</Body>
    </CustomCard.Section>

    <CustomCard.Section>
      {right.status && (
        <Status>
          <CustomCard.Text color={color}>{right.status}</CustomCard.Text>
        </Status>
      )}

      <FormButton
        link={right.details}
        label={<FormattedMessage id="orderDetails" />}
        backgroundColor="#fff"
        labelColor="#000"
        flat={false}
      />
    </CustomCard.Section>
  </CustomCard>
);

Order.defaultProps = {
  color: null,
};

Order.propTypes = {
  color: PropTypes.string,
  left: PropTypes.shape({
    body: PropTypes.object,
    header: PropTypes.object,
  }).isRequired,
  middle: PropTypes.shape({
    body: PropTypes.object,
    header: PropTypes.object,
  }).isRequired,
  right: PropTypes.shape({
    details: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default Order;
