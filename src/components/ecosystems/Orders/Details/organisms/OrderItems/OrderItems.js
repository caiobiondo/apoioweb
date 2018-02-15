import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Paper, FlatButton, Dialog } from 'natura-ui';
import { translate } from 'locale';

import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import { AddStockProductMutation } from './OrderItems.data';
import { StockProductsQuery } from 'components/ecosystems/Stock/List/organisms/ListTable/ListTable.data';
import OrderItem from '../OrderItem/OrderItem';
import { dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';

import {
  OrderDetailsWrapper,
  OrderItemsInfos,
  OrderItemsQuantityWrapper,
  OrderItemsQuantity,
  OrderItemsHeader,
  OrderItemsHeaderProductDescription,
  OrderItemsHeaderProductValuesWrapper,
  OrderItemsHeaderProductValueLabel,
  dialogContentStyle,
} from './OrderItems.styles';

export class OrderItems extends Component {
  state = {
    importedOrderItems: [],
    importedModalOpened: false,
    productsImporting: [],
  };

  onImport = (orderItem, indexItem) => {
    this.setState({
      productsImporting: [...this.state.productsImporting, orderItem.codigoProduto],
    });

    this.props
      .mutate({
        variables: {
          input: {
            productCode: orderItem.codigoProduto,
            stockQuantity: orderItem.quantidadeItem,
            cycleId: getCycleIdFromUser(this.props.user),
            commercialStructureId: getCommercialStructureIdFromUser(this.props.user),
            commercialStructureTypeId: getCommercialStructureTypeIdFromUser(this.props.user),
          },
        },
        refetchQueries: [
          {
            query: StockProductsQuery,
            variables: {
              limit: 10,
              offset: 0,
              filter: '',
            },
          },
        ],
      })
      .then(() => {
        this.setState({
          productsImporting: [...this.state.productsImporting.slice(indexItem)],
          importedModalOpened: true,
          importedOrderItems: [...this.state.importedOrderItems, orderItem],
        });
      });
  };

  renderSuccessDialog = () => {
    const title = translate('stockProductImported');
    const actions = [
      <FlatButton
        label={<FormattedMessage id="goToStock" />}
        onClick={this.goToStock}
        labelStyle={dialogActions}
      />,
      <FlatButton
        label={<FormattedMessage id="importMoreProducts" />}
        primary={true}
        onClick={this.onFinish}
        labelStyle={dialogActions}
      />,
    ];

    return (
      <Dialog
        key="successDialog"
        title={title}
        actions={actions}
        modal={false}
        open={this.state.importedModalOpened}
        onRequestClose={this.onFinish}
        contentStyle={dialogContentStyle}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      />
    );
  };

  onFinish = () => {
    this.setState({ importedModalOpened: false });
  };

  goToStock = () => {
    this.props.history.push(`/my-stock`);
  };

  renderOrderItems = orderItems => {
    const { importing } = this.props;
    if (!orderItems) return null;

    return (
      <div>
        <OrderItemsHeader>
          <OrderItemsHeaderProductDescription>
            <FormattedMessage id="orderItemProduct" />
          </OrderItemsHeaderProductDescription>
          <OrderItemsHeaderProductValuesWrapper>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemQuantity" />
            </OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemValue" />
            </OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemPoints" />
            </OrderItemsHeaderProductValueLabel>
            {importing && <OrderItemsHeaderProductValueLabel />}
          </OrderItemsHeaderProductValuesWrapper>
        </OrderItemsHeader>
        {orderItems.map((orderItem, indexItem) => this.renderOrderItem(orderItem, indexItem))}
      </div>
    );
  };

  renderOrderItem = (orderItem, indexItem) => {
    const imported = this.state.importedOrderItems.filter(i => i === orderItem).length > 0;
    const { productsImporting } = this.state;
    const onImportOrderItem = event => {
      event.stopPropagation();
      this.onImport(orderItem, indexItem);
    };

    return (
      <OrderItem
        {...this.props}
        key={orderItem.codigoProduto}
        orderItem={orderItem}
        imported={imported}
        loading={productsImporting.includes(orderItem.codigoProduto)}
        onImport={onImportOrderItem}
      />
    );
  };

  render() {
    const { order } = this.props;

    return (
      <Paper style={OrderDetailsWrapper}>
        <SectionTitle iconName="ico_box" value="orderItems" />
        <OrderItemsInfos>
          <OrderItemsQuantityWrapper>
            <FormattedMessage id="orderItemsBoughtQuantity" />
            <OrderItemsQuantity>({(order.itemEnviadoCaixa || []).length})</OrderItemsQuantity>
          </OrderItemsQuantityWrapper>
          {this.renderOrderItems(order.itemEnviadoCaixa)}
        </OrderItemsInfos>
        {this.renderSuccessDialog()}
      </Paper>
    );
  }
}

export const OrderItemsWithData = graphql(AddStockProductMutation)(OrderItems);
export default withRouter(OrderItemsWithData);
