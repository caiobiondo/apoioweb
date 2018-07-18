export default {
  Group: {
    domainPadding: { x: 0, y: 20 },
    padding: 0,
  },
  CurrentPeriod: {
    animate: {
      onLoad: { duration: 800 },
    },
    interpolation: 'monotoneX',
  },
  PastPeriod: {
    animate: {
      onLoad: { duration: 800 },
    },
    interpolation: 'natural',
  },
};
