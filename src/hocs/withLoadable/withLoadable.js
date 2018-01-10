import Loadable from 'react-loadable';

export default component => {
  return Loadable({
    loader: () => component,
    loading() {
      return null;
    },
  });
};
