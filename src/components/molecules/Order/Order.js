import React from 'react';
import PropTypes from 'prop-types';
import { FormButton } from 'natura-ui';
import { FormattedMessage } from 'react-intl';

import { Header, Body, Status, Label } from './Order.styles';

import CustomCard from 'components/molecules/CustomCard/CustomCard';

const renderFields = fields => {
  if (!fields) {
    return null;
  }

  return Object.keys(fields)
    .filter(key => fields[key])
    .map(key => (
      <div key={key}>
        <Label>
          <FormattedMessage id={key} />
        </Label>
        <div>{fields[key]}</div>
      </div>
    ));
};

const colorByStatusType = statusType => {
  switch (statusType) {
    case 'approved':
      return CustomCard.SUCCESS;
    case 'cancelled':
      return CustomCard.DANGER;
    default:
      return CustomCard.WARNING;
  }
};

const Order = ({ statusType, left, middle, right }) => {
  const color = colorByStatusType(statusType);
  return (
    <CustomCard color={color}>
      <CustomCard.Section alignItems="flex-start">
        <Header>{renderFields(left.header)}</Header>
        <Body>{renderFields(left.body)}</Body>
      </CustomCard.Section>

      <CustomCard.Section alignItems="flex-start" justifyContent="space-between">
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
          label={
            <Label>
              <FormattedMessage id="orderDetails" />
            </Label>
          }
          backgroundColor="#fff"
          labelColor="#000"
          flat={false}
        />
      </CustomCard.Section>
    </CustomCard>
  );
};

Order.defaultProps = {
  statusType: 'pending',
};

Order.propTypes = {
  statusType: PropTypes.string,
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
