import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MultimediaItemWrapper,
  MultimediaItemPaper,
  MultimediaItemThumbnail,
  MultimediaItemDescriptionWrapper,
  MultimediaItemIconWrapper,
  MultimediaItemDescription,
  MultimediaItemDescriptionTitle,
} from './MultimediaItem.styles';
import { Icon } from 'natura-ui';
import ImageWithFallback from 'components/molecules/ImageWithFallback/ImageWithFallback';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

export class MultimediaItem extends Component {
  openContent = multimedia => event => {
    const firstItem = multimedia.content[0];
    if (firstItem && firstItem.downloadUrl) {
      const urlToOpen = firstItem.bearerToken
        ? `${firstItem.downloadUrl}?token=${firstItem.bearerToken}`
        : firstItem.downloadUrl;
      window.open(urlToOpen, '_blank');
    }
  };

  render() {
    const { multimedia } = this.props;
    return (
      <MultimediaItemWrapper key={multimedia.id}>
        <MultimediaItemPaper>
          <MultimediaItemDescriptionWrapper>
            <MultimediaItemIconWrapper>
              <Icon file="ico_file" />
            </MultimediaItemIconWrapper>
            <MultimediaItemDescription onClick={this.openContent(multimedia)}>
              <MultimediaItemDescriptionTitle>{multimedia.title}</MultimediaItemDescriptionTitle>
            </MultimediaItemDescription>
          </MultimediaItemDescriptionWrapper>
          <MultimediaItemThumbnail onClick={this.openContent(multimedia)}>
            <ImageWithFallback imageUrl={multimedia.thumbnail} fallbackIcon="ico_photo" />
          </MultimediaItemThumbnail>
        </MultimediaItemPaper>
      </MultimediaItemWrapper>
    );
  }
}

MultimediaItem.propTypes = {
  multimedia: PropTypes.object.isRequired,
};

export const MultimediaItemwithIntl = injectIntl(MultimediaItem);
export default withRouter(MultimediaItemwithIntl);
