import { LoadingWrapperStyle } from 'styles/mixins';
import { RobotoRegular } from 'styles/typography';
import { white } from 'styles/colors';

export const LoadingWrapper = LoadingWrapperStyle;

export const fullContainer = {
  height: '100%',
};

export const searchButtonStyles = {
  labelStyle: {
    color: white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: RobotoRegular,
  },
  height: 40,
};
