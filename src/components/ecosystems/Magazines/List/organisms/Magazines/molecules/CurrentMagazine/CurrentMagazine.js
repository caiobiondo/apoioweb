import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';
import { FlatButton, Icon, FormButton } from 'natura-ui';
import { Dialog } from 'material-ui';
import {
  CurrentMagazineWrapper,
  CurrentMagazineHeader,
  CurrentMagazineCover,
  CurrentMagazinePeriod,
  CurrentMagazineTitle,
  CurrentMagazineDescription,
  CurrentMagazineTaxWrapper,
  CurrentMagazineTaxInfoTitle,
  CurrentMagazineTaxInfoDescription,
  CurrentMagazineTaxViewMore,
  ButtonWrapper,
  CurrentMagazineInfo,
  CurrentMagazineInfoWrapper,
  CurrentMagazineAdditionalInfo,
  CurrentMagazineSeeMore,
  CurrentMagazineTaxItem,
  CurrentMagazineTaxItemDatum,
  CurrentMagazineHeaderTaxItemDatum,
} from './CurrentMagazine.styles';
import ImageWithFallback from 'components/molecules/ImageWithFallback';
import { FormattedNumber } from 'react-intl';

export class CurrentMagazine extends Component {
  state = {
    additionalInfoOpened: false,
    taxViewMoreOpened: false,
  };

  downloadMagazine = () => {
    const { magazine } = this.props;
    window.open(magazine.pdfFile);
  };

  openMagazine = () => {
    const { magazine, type } = this.props;
    this.props.history.push(`/magazines/view/${type}/${magazine.id}`);
  };

  toggleAdditionalInfo = () => {
    this.setState({ additionalInfoOpened: !this.state.additionalInfoOpened });
  };

  openTaxViewMore = () => {
    this.setState({ taxViewMoreOpened: !this.state.taxViewMoreOpened });
  };

  handleTaxViewMoreClose = () => {
    this.setState({ taxViewMoreOpened: false });
  };

  renderTaxViewMoreActions = () => {
    return [
      <FlatButton label={translate('ok')} primary={true} onClick={this.handleTaxViewMoreClose} />,
    ];
  };

  renderTaxViewMoreDialog = () => {
    const dialogData = [
      { productType: translate('beardProducts'), tax: 56.48 },
      { productType: translate('hairProducts'), tax: 51.33 },
      { productType: translate('bodyProducts'), tax: 47.03 },
      { productType: translate('deodorantColony'), tax: 44.99 },
      { productType: translate('deodorantAnti'), tax: 44.99 },
      { productType: translate('makeupProducts'), tax: 55.94 },
      { productType: translate('bodyOils'), tax: 45.78 },
      { productType: translate('parfum'), tax: 49.16 },
    ];

    return (
      <Dialog
        title={translate('taxBurden')}
        actions={this.renderTaxViewMoreActions()}
        open={this.state.taxViewMoreOpened}
        modal={false}
        onRequestClose={this.handleTaxViewMoreClose}
      >
        <CurrentMagazineTaxItem>
          <CurrentMagazineHeaderTaxItemDatum>
            {translate('productType')}
          </CurrentMagazineHeaderTaxItemDatum>
          <CurrentMagazineHeaderTaxItemDatum>
            {translate('taxIBPT')}
          </CurrentMagazineHeaderTaxItemDatum>
        </CurrentMagazineTaxItem>
        {dialogData.map((datum, index) => {
          return (
            <CurrentMagazineTaxItem key={index}>
              <CurrentMagazineTaxItemDatum>{datum.productType}</CurrentMagazineTaxItemDatum>
              <CurrentMagazineTaxItemDatum>
                <FormattedNumber value={datum.tax} />%
              </CurrentMagazineTaxItemDatum>
            </CurrentMagazineTaxItem>
          );
        })}
      </Dialog>
    );
  };

  render() {
    const { magazine } = this.props;
    const { additionalInfoOpened } = this.state;

    if (!magazine) return null;

    return (
      <CurrentMagazineWrapper>
        <CurrentMagazineHeader>{translate('currentMagazine')}</CurrentMagazineHeader>
        <CurrentMagazineInfoWrapper>
          <CurrentMagazineCover>
            <ImageWithFallback imageUrl={magazine.highlightImage} />
          </CurrentMagazineCover>
          <CurrentMagazineInfo>
            <CurrentMagazinePeriod>
              {translate('magazineCycle')} {magazine.period}
            </CurrentMagazinePeriod>
            <CurrentMagazineTitle>{magazine.title}</CurrentMagazineTitle>
            <CurrentMagazineAdditionalInfo opened={additionalInfoOpened}>
              <CurrentMagazineDescription
                dangerouslySetInnerHTML={{ __html: magazine.description }}
              />
              <ButtonWrapper>
                <FlatButton
                  label={translate('downloadMagazine')}
                  primary
                  onClick={this.downloadMagazine}
                  icon={<Icon file="ico_magazine_download" />}
                />
                <FlatButton
                  label={translate('visualizeMagazine')}
                  primary
                  onClick={this.openMagazine}
                  icon={<Icon file="ico_view" />}
                />
              </ButtonWrapper>
              <CurrentMagazineTaxWrapper>
                <CurrentMagazineTaxInfoTitle>
                  <CurrentMagazineTaxViewMore onClick={this.openTaxViewMore}>
                    {translate('taxViewMore')}
                  </CurrentMagazineTaxViewMore>
                  {translate('taxInfoTitle')}
                </CurrentMagazineTaxInfoTitle>
                <CurrentMagazineTaxInfoDescription>
                  {translate('taxInfoDescription')}
                </CurrentMagazineTaxInfoDescription>
              </CurrentMagazineTaxWrapper>
            </CurrentMagazineAdditionalInfo>
            <CurrentMagazineSeeMore>
              <FormButton
                fullWidth
                primary
                label={additionalInfoOpened ? translate('hide') : translate('viewMore')}
                onClick={this.toggleAdditionalInfo}
                raised="true"
              />
            </CurrentMagazineSeeMore>
          </CurrentMagazineInfo>
        </CurrentMagazineInfoWrapper>
        {this.renderTaxViewMoreDialog()}
      </CurrentMagazineWrapper>
    );
  }
}

export default withRouter(CurrentMagazine);
