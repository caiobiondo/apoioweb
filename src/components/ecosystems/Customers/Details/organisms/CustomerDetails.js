import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  CustomerNameWrapper,
  CustomerName,
  CustomerEditWrapper,
  CustomerDataTitle,
  CustomerDatumTelephoneNumber,
  CustomerDatumTelephoneProvider,
  CustomerDatumTelephone,
  CustomerDatumHalfWrapper,
  CustomerDataTelephones,
  CustomerDataAddresses,
  CustomerDatumAddress,
} from './CustomerDetails.styles';
import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import CustomerDatum from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum';
import { CustomerDatumValue } from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum.styles';

import { Paper, Loading, Icon } from 'natura-ui';
import { Avatar } from 'material-ui';

export class CustomerDetails extends Component {
  renderAddresses(addresses) {
    if (!addresses) return null;

    return addresses.map((address, index) => {
      return this.renderAddress(address, index);
    });
  }

  renderAddress(address, index) {
    return (
      <CustomerDatumAddress key={index}>
        <CustomerDatumValue>{this.renderStreetName(address)}</CustomerDatumValue>
        <CustomerDatumValue>{this.renderNeighborhoodZipcode(address)}</CustomerDatumValue>
        <CustomerDatumValue>{this.renderCityState(address)}</CustomerDatumValue>
      </CustomerDatumAddress>
    );
  }

  renderPhone({ phone, provider }, index) {
    return (
      <CustomerDatumTelephone key={index}>
        <CustomerDatumTelephoneNumber>{phone}</CustomerDatumTelephoneNumber>
        <CustomerDatumTelephoneProvider>{provider}</CustomerDatumTelephoneProvider>
      </CustomerDatumTelephone>
    );
  }

  renderPhones(phones) {
    return phones.map((phone, index) => {
      return this.renderPhone(phone, index);
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

    const nameInitials = customer.name
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g)
      .join('');
    const email = customer.emails && customer.emails[0] && customer.emails[0].email;
    const phone = customer.phones && customer.phones[0] && customer.phones[0].phone;
    const phoneProvider = customer.phones && customer.phones[0] && customer.phones[0].provider;

    return (
      <Main>
        <Paper style={CustomerDetailsWrapper}>
          <CustomerDetailsSectionTitleWrapper>
            <SectionTitle iconName="ico_info" value="customerProfile" />
          </CustomerDetailsSectionTitleWrapper>
          <CustomerDetailsData>
            <CustomerAvatarWrapper>
              <Avatar size={115} style={CustomerAvatarStyle}>
                {nameInitials}
              </Avatar>
            </CustomerAvatarWrapper>
            <CustomerDataWrapper>
              <CustomerData primary>
                <CustomerNameWrapper>
                  <CustomerName>{customer.name}</CustomerName>
                  <CustomerEditWrapper>
                    <Link to={`/customers/${customer.id}/edit`}>
                      <Icon file="ico_pencil" />
                    </Link>
                  </CustomerEditWrapper>
                </CustomerNameWrapper>
                <CustomerDatumValue>{email}</CustomerDatumValue>
                <CustomerDatumValue>{phone}</CustomerDatumValue>
                <CustomerDatumValue>{phoneProvider}</CustomerDatumValue>
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
                  {this.renderAddresses(customer.addresses)}
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
