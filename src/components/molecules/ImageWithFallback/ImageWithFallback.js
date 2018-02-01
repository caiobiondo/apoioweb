import React from 'react';
import Img from 'react-image';
import { CircularProgress, Icon } from 'natura-ui';
import { Wrapper } from './ImageWithFallback.styles';

const ImageWithFallback = props => {
  const fallbackImage = props.unloader ? props.unloader : <Icon file={props.fallbackIcon} />;
  const loader = <CircularProgress thickness={2} />;

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
