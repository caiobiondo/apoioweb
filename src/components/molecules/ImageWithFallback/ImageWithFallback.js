import React from 'react';
import Img from 'react-image';
import { Loading, Icon } from 'natura-ui';
import { Wrapper } from './ImageWithFallback.styles';

const ImageWithFallback = props => {
  const fallbackImage = <Icon file={props.fallbackIcon} />;
  const loader = <Loading />;

  return (
    <Wrapper width={props.width} height={props.height || props.width} className={props.className}>
      <Img src={props.imageUrl} loader={loader} unloader={fallbackImage} />
    </Wrapper>
  );
};

ImageWithFallback.defaultProps = {
  fallbackIcon: 'ico_pictureless',
};

export default ImageWithFallback;
