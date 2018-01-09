const apolloLinkError = jest.genMockFromModule('apollo-link-error');

apolloLinkError.onError = (callback) => {
  const fakeLink = function(response) {
    return callback(response);
  };

  fakeLink.concat = (next) => next;

  return fakeLink;
};

module.exports = apolloLinkError;
