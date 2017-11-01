import { CARD_COLOR, getGradientColor, getSolidColor } from './colors';

describe('Colors Utils', () => {
  it('should define CARD_COLOR constants', () => {
    expect(CARD_COLOR).toEqual({
      DANGER: 'DANGER',
      INFO: 'INFO',
      SUCCESS: 'SUCCESS',
      WARNING: 'WARNING',
    });
  });

  describe('getGradientColor', () => {
    it('should return SUCCESS gradient color', () => {
      const gradient = getGradientColor(CARD_COLOR.SUCCESS);
      expect(gradient).toEqual('linear-gradient(#89ddd2, #cddb50)');
    });

    it('should return WARNING gradient color', () => {
      const gradient = getGradientColor(CARD_COLOR.WARNING);
      expect(gradient).toEqual('linear-gradient(#fcdf4f, #d5bf3e)');
    });

    it('should return DANGER gradient color', () => {
      const gradient = getGradientColor(CARD_COLOR.DANGER);
      expect(gradient).toEqual('linear-gradient(#f19632, #de3b2f)');
    });

    it('should return INFO gradient color', () => {
      const gradient = getGradientColor(CARD_COLOR.INFO);
      expect(gradient).toEqual('linear-gradient(#9271cb, #6091ca)');
    });

    it('should return default gradient color', () => {
      const gradient = getGradientColor(null);
      expect(gradient).toEqual('transparent');
    });
  });

  describe('getSolidColor', () => {
    it('should return SUCCESS gradient color', () => {
      const gradient = getSolidColor(CARD_COLOR.SUCCESS);
      expect(gradient).toEqual('#bed164');
    });

    it('should return WARNING gradient color', () => {
      const gradient = getSolidColor(CARD_COLOR.WARNING);
      expect(gradient).toEqual('#dac75e');
    });

    it('should return DANGER gradient color', () => {
      const gradient = getSolidColor(CARD_COLOR.DANGER);
      expect(gradient).toEqual('#e25e57');
    });

    it('should return INFO gradient color', () => {
      const gradient = getSolidColor(CARD_COLOR.INFO);
      expect(gradient).toEqual('#7ea7be');
    });

    it('should return default gradient color', () => {
      const gradient = getSolidColor(null);
      expect(gradient).toEqual('#404040');
    });
  });
});
