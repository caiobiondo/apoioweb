import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal } from 'natura-ui';
import { WithErrorHandler } from './withErrorHandler';

class WrappedComponent extends React.Component {
  render() {
    return <div />;
  }
}

fdescribe('withErrorHandler HOC', () => {
  describe('when there are no errors', () => {
    it('renders', () => {
      // given
      const Component = WithErrorHandler(WrappedComponent);

      // when
      const result = shallow(<Component />);

      // then
      expect(result).toMatchSnapshot();
    });

    it('renders the component', () => {
      // given
      const MockedComponent = WithErrorHandler(WrappedComponent);

      // when
      const result = shallow(<MockedComponent />);

      // then
      expect(result.find(WrappedComponent).exists()).toBeTruthy();
    });
  });

  describe('when there are errors', () => {
    it('does not renders the component', () => {
      // given
      const MockedComponent = WithErrorHandler(WrappedComponent);
      const withError = { errored: true, open: true };

      // when
      const result = shallow(<MockedComponent />);
      result.setState(withError);

      // then
      expect(result.find(WrappedComponent).exists()).toBeFalsy();
    });

    it('renders an opened modal', () => {
      // given
      const MockedComponent = WithErrorHandler(WrappedComponent);
      const withError = { errored: true, open: true };

      // when
      const result = shallow(<MockedComponent />);
      result.setState(withError);

      // then
      expect(result.find(Modal).props().open).toBeTruthy();
    });

    describe('when dismissing modal', () => {
      it('closes a modal', () => {
        // given
        const MockedComponent = WithErrorHandler(WrappedComponent);
        const withError = { errored: true, open: true };
        const mockedEvent = { stopPropagation: () => {} };
        const mockedProps = {
          history: {
            goBack: jest.fn(),
          },
        };

        // when
        const result = shallow(<MockedComponent {...mockedProps} />);
        result.setState(withError);
        result.instance().handleClose(mockedEvent);

        // workaround: forcing re-rendering =/
        result.setState();

        // then
        expect(result.find(Modal).props().open).toBeFalsy();
      });

      it('redirects to previous page', () => {
        // given
        const MockedComponent = WithErrorHandler(WrappedComponent);
        const mockedEvent = { stopPropagation: () => {} };
        const mockedProps = {
          history: {
            goBack: jest.fn(),
          },
        };

        // when
        const result = shallow(<MockedComponent {...mockedProps} />);
        result.instance().handleClose(mockedEvent);

        // then
        expect(mockedProps.history.goBack).toHaveBeenCalled();
      });
    });
  });
});
