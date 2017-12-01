import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import Img from 'react-image';
import { formatDate } from 'locale/utils';
import { CustomerDetailsQuery, CustomerDetailsQueryOptions } from './CustomerDetails.data';
import withUserData from 'hocs/withUserData/withUserData';
import {
  CustomerDetailsWrapper,
  CustomerDetailsData,
  CustomerDetailsSectionTitleWrapper,
  CustomerAvatarWrapper,
  CustomerAvatar,
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
import SectionTitle from 'components/organisms/OrderDetailsData/molecules/SectionTitle';
import CustomerDatum from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum';
import {
  CustomerDatumLabel,
  CustomerDatumValue,
} from 'components/ecosystems/Customers/Details/molecules/CustomerDatum/CustomerDatum.styles';

import { Paper, Loading, Icon } from 'natura-ui';
import { Avatar } from 'material-ui';

export class CustomerDetails extends Component {
  render() {
    const { data: { customer, loading } } = this.props;

    if (loading) {
      return <Loading background="transparent" />;
    }

    return (
      <Paper style={CustomerDetailsWrapper}>
        <CustomerDetailsSectionTitleWrapper>
          <SectionTitle iconName="ico_info" value="customerProfile" />
        </CustomerDetailsSectionTitleWrapper>
        <CustomerDetailsData>
          <CustomerAvatarWrapper>
            <CustomerAvatar>
              <Avatar size="120">JV</Avatar>
            </CustomerAvatar>
          </CustomerAvatarWrapper>
          <CustomerDataWrapper>
            <CustomerData primary>
              <CustomerName>Juliana Veiga</CustomerName>
              <CustomerDatumValue>julianaveiga@gmail.com</CustomerDatumValue>
              <CustomerDatumValue>(11) 98135-9098</CustomerDatumValue>
              <CustomerDatumValue>TIM</CustomerDatumValue>
            </CustomerData>
            <CustomerData secondary>
              <CustomerDatum label="customerFullName" value="Juliana Montenegro da Veiga" />
              <CustomerDatumHalfWrapper>
                <CustomerDatum label="customerBirthdate" value="20/01/1985" />
                <CustomerDatum label="customerGenre" value="Feminino" />
              </CustomerDatumHalfWrapper>
            </CustomerData>
            <CustomerData secondary>
              <CustomerDataTelephones>
                <CustomerDataTitle>
                  <FormattedMessage id="customerOtherTelephoneNumbers" />
                </CustomerDataTitle>
                <CustomerDatumTelephone>
                  <CustomerDatumTelephoneNumber>(11) 98135-9098</CustomerDatumTelephoneNumber>
                  <CustomerDatumTelephoneProvider>VIVO</CustomerDatumTelephoneProvider>
                </CustomerDatumTelephone>
                <CustomerDatumTelephone>
                  <CustomerDatumTelephoneNumber>(11) 98135-9098</CustomerDatumTelephoneNumber>
                  <CustomerDatumTelephoneProvider>CLARO</CustomerDatumTelephoneProvider>
                </CustomerDatumTelephone>
              </CustomerDataTelephones>
              <CustomerDataAddresses>
                <CustomerDataTitle>
                  <FormattedMessage id="customerAddress" />
                </CustomerDataTitle>
                <CustomerDatumLabel>Residencial</CustomerDatumLabel>
                <CustomerDatumValue>Rua Américo Brasiliense, 1248</CustomerDatumValue>
                <CustomerDatumValue>Chácara Santo Antônio – 05044-090</CustomerDatumValue>
                <CustomerDatumValue>São Paulo - SP</CustomerDatumValue>
              </CustomerDataAddresses>
            </CustomerData>
            <CustomerData secondary>
              <CustomerDataTitle>
                <FormattedMessage id="customerNotes" />
              </CustomerDataTitle>
              <CustomerDatumValue>
                Prefere contato via whatsapp, por texto. Não gosta que ligue. Gosta de receber
                promoções. Sempre compra muita maquiagem (TOM Médio 22).
              </CustomerDatumValue>
            </CustomerData>
          </CustomerDataWrapper>
        </CustomerDetailsData>
      </Paper>
    );
  }
}

export const CustomerDetailsWithIntl = injectIntl(CustomerDetails);

export const CustomerDetailsWithData = graphql(CustomerDetailsQuery, CustomerDetailsQueryOptions)(
  CustomerDetailsWithIntl,
);

export default withUserData(CustomerDetailsWithData);
