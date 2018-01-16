import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'locale';
import { FlatButton, Icon } from 'natura-ui';
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
  ButtonWrapper,
  CurrentMagazineInfo,
  CurrentMagazineInfoWrapper,
} from './CurrentMagazine.styles';

class CurrentMagazine extends Component {
  downloadMagazine = () => {
    const { magazine } = this.props;
    window.open(magazine.pdfFile);
  };

  openMagazine = () => {
    const { magazine } = this.props;
    this.props.history.push(`/magazines/view/${magazine.id}`, { magazine });
  };

  render() {
    const { magazine } = this.props;
    return (
      <CurrentMagazineWrapper>
        <CurrentMagazineHeader>{translate('currentMagazine')}</CurrentMagazineHeader>
        <CurrentMagazineInfoWrapper>
          <CurrentMagazineCover src={magazine.highlightImage} alt={translate('currentMagazine')} />
          <CurrentMagazineInfo>
            <CurrentMagazinePeriod>
              {translate('magazineCycle')} {magazine.period}
            </CurrentMagazinePeriod>
            <CurrentMagazineTitle>{magazine.title}</CurrentMagazineTitle>
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
                <Link to={''} target="_blank">
                  {translate('taxViewMore')}
                </Link>{' '}
                {translate('taxInfoTitle')}
              </CurrentMagazineTaxInfoTitle>
              <CurrentMagazineTaxInfoDescription>
                {translate('taxInfoDescription')}
              </CurrentMagazineTaxInfoDescription>
            </CurrentMagazineTaxWrapper>
          </CurrentMagazineInfo>
        </CurrentMagazineInfoWrapper>
      </CurrentMagazineWrapper>
    );
  }
}

export default withRouter(CurrentMagazine);
