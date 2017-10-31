export const CARD_COLOR = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
  INFO: 'INFO'
};

export function getGradientColor(color) {
  if (color === CARD_COLOR.SUCCESS) {
    return 'linear-gradient(#89ddd2, #cddb50)';
  }
  if (color === CARD_COLOR.WARNING) {
    return 'linear-gradient(#fcdf4f, #d5bf3e)';
  }
  if (color === CARD_COLOR.DANGER) {
    return 'linear-gradient(#f19632, #de3b2f)';
  }
  if (color === CARD_COLOR.INFO) {
    return 'linear-gradient(#9271cb, #6091ca)';
  }

  return 'transparent';
}

export function getSolidColor(color) {
  if (color === CARD_COLOR.SUCCESS) {
    return '#bed164';
  }
  if (color === CARD_COLOR.WARNING) {
    return '#dac75e';
  }
  if (color === CARD_COLOR.DANGER) {
    return '#e25e57';
  }
  if (color === CARD_COLOR.INFO) {
    return '#7ea7be';
  }

  return '#404040';
}
