import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { formatDate } from 'locale/utils';
import { CustomerDetailsQuery, CustomerDetailsQueryOptions } from './CustomerDetails.data';
import withUserData from 'hocs/withUserData/withUserData';
import {
  Main,
  CustomerDetailsWrapper,
  CustomerDetailsData,
  CustomerDetailsSectionTitleWrapper,
  CustomerAvatarWrapper,
  CustomerAvatarStyle,
  CustomerDataWrapper,
  CustomerData,
  CustomerName,
  CustomerDataTitle,
  CustomerDatumTelephoneNumber,
  CustomerDatumTelephoneProvider,
  CustomerDatumTelephone,
  CustomerDatumHalfWrapper,
  CustomerDataTelephones,
  CustomerDataAddresses,
} from './CustomerDetails.styles';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import CustomerDatum from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum';
import {
  CustomerDatumLabel,
  CustomerDatumValue,
} from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum.styles';

import { Paper, Loading } from 'natura-ui';
import { Avatar } from 'material-ui';

export class CustomerDetails extends Component {
  renderPhone({ phone, provider }) {
    return (
      <CustomerDatumTelephone>
        <CustomerDatumTelephoneNumber>{phone}</CustomerDatumTelephoneNumber>
        <CustomerDatumTelephoneProvider>{provider}</CustomerDatumTelephoneProvider>
      </CustomerDatumTelephone>
    );
  }

  renderPhones(phones) {
    return phones.map(phone => {
      return this.renderPhone(phone);
    });
  }

  /* eslint-disable camelcase */
  renderStreetName({ street_name, street_number }) {
    return `${street_name}, ${street_number}`;
  }
  /* eslint-enable camelcase */

  renderNeighborhoodZipcode({ neighborhood, zipcode }) {
    return `${neighborhood} - ${zipcode}`;
  }

  renderCityState({ city, state }) {
    return `${city} - ${state}`;
  }

  render() {
    const { data: { customer, loading }, intl } = this.props;

    if (loading) {
      return <Loading background="transparent" />;
    }

    let gender = null;
    if (customer.gender) {
      gender = <FormattedMessage id={`gender.${customer.gender}`} />;
    }

    return (
      <Main>
        <Paper style={CustomerDetailsWrapper}>
          <CustomerDetailsSectionTitleWrapper>
            <SectionTitle iconName="ico_info" value="customerProfile" />
          </CustomerDetailsSectionTitleWrapper>
          <CustomerDetailsData>
            <CustomerAvatarWrapper>
              <Avatar size={115} style={CustomerAvatarStyle}>
                {customer.name
                  .replace(/[^a-zA-Z- ]/g, '')
                  .match(/\b\w/g)
                  .join('')}
              </Avatar>
            </CustomerAvatarWrapper>
            <CustomerDataWrapper>
              <CustomerData primary>
                <CustomerName>{customer.name}</CustomerName>
                <CustomerDatumValue>
                  {customer.emails && customer.emails[0] && customer.emails[0].email}
                </CustomerDatumValue>
                <CustomerDatumValue>
                  {customer.phones && customer.phones[0] && customer.phones[0].phone}
                </CustomerDatumValue>
                <CustomerDatumValue>
                  {customer.phones && customer.phones[0] && customer.phones[0].provider}
                </CustomerDatumValue>
              </CustomerData>
              <CustomerData secondary>
                <CustomerDatum label="customerFullName" value={customer.name} />
                <CustomerDatumHalfWrapper>
                  <CustomerDatum
                    label="customerBirthdate"
                    value={formatDate(customer.birthday, intl)}
                  />
                  <CustomerDatum label="customerGender" value={gender} />
                </CustomerDatumHalfWrapper>
              </CustomerData>
              <CustomerData secondary>
                <CustomerDataTelephones>
                  <CustomerDataTitle>
                    <FormattedMessage id="customerOtherTelephoneNumbers" />
                  </CustomerDataTitle>
                  {this.renderPhones(customer.phones.slice(1))}
                </CustomerDataTelephones>
                <CustomerDataAddresses>
                  <CustomerDataTitle>
                    <FormattedMessage id="customerAddress" />
                  </CustomerDataTitle>
                  <CustomerDatumValue>
                    {customer.addresses &&
                      customer.addresses[0] &&
                      this.renderStreetName(customer.addresses[0])}
                  </CustomerDatumValue>
                  <CustomerDatumValue>
                    {customer.addresses &&
                      customer.addresses[0] &&
                      this.renderNeighborhoodZipcode(customer.addresses[0])}
                  </CustomerDatumValue>
                  <CustomerDatumValue>
                    {customer.addresses &&
                      customer.addresses[0] &&
                      this.renderCityState(customer.addresses[0])}
                  </CustomerDatumValue>
                </CustomerDataAddresses>
              </CustomerData>
              <CustomerData secondary>
                <CustomerDataTitle>
                  <FormattedMessage id="customerNotes" />
                </CustomerDataTitle>
                <CustomerDatumValue>{customer.comment}</CustomerDatumValue>
              </CustomerData>
            </CustomerDataWrapper>
          </CustomerDetailsData>
        </Paper>
      </Main>
    );
  }
}

export const CustomerDetailsWithIntl = injectIntl(CustomerDetails);

export const CustomerDetailsWithData = graphql(CustomerDetailsQuery, CustomerDetailsQueryOptions)(
  CustomerDetailsWithIntl,
);

export default withUserData(CustomerDetailsWithData);
