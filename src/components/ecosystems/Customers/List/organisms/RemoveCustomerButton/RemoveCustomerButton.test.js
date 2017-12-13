import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { RemoveCustomerButton } from './RemoveCustomerButton';
import { CustomersListQuery } from '../CustomersList/CustomersList.data';

const intl = {
  formatMessage: value => `formatedMessage ${value}`,
};

describe('RemoveCustomerButton', () => {
  it('should render the add customers button', () => {
    const renderer = new ShallowRenderer();
    const selectedCustomers = [];
    const onRemove = jest.fn();
    const isCustomerSelected = false;

    renderer.render(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the remove customers button', () => {
    const renderer = new ShallowRenderer();
    const selectedCustomers = [{ id: 123 }];
    const onRemove = jest.fn();
    const isCustomerSelected = true;

    renderer.render(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should set the internal state to open when action is triggered and remove is true', () => {
    const selectedCustomers = [{ id: 123 }];
    const onRemove = jest.fn();
    const isCustomerSelected = true;

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const instance = result.instance();

    instance.onButtonAction();

    expect(instance.state).toEqual({ open: true });
  });

  it('should not change state to open when action is triggered and remove is false', () => {
    const selectedCustomers = [];
    const onRemove = jest.fn();
    const isCustomerSelected = false;

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const instance = result.instance();

    instance.onButtonAction();

    expect(instance.state).toEqual({ open: false });
  });

  it('should set the internal state to not open when onCloseModal is triggered', () => {
    const selectedCustomers = [{ id: 123 }];
    const onRemove = jest.fn();
    const isCustomerSelected = true;

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const instance = result.instance();
    instance.onButtonAction();

    instance.onCloseModal();

    expect(instance.state).toEqual({ open: false });
  });

  it('should not call apollo mutate when selected items is empty', () => {
    const selectedCustomers = [];
    const onRemove = jest.fn();
    const isCustomerSelected = false;
    const mutateMock = jest.fn();

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
        mutate={mutateMock}
      />,
    );
    const instance = result.instance();
    instance.removeCustomer();

    expect(instance.state).toEqual({ open: false });
    expect(mutateMock).not.toBeCalled();
  });

  it('should call apollo mutate when selected items', () => {
    const selectedCustomers = [{ id: 123 }];
    const onRemove = jest.fn();
    const isCustomerSelected = true;
    const mutateMock = jest.fn().mockReturnValue(Promise.resolve(true));

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
        mutate={mutateMock}
      />,
    );
    const instance = result.instance();
    instance.removeCustomer();

    expect(instance.state).toEqual({ open: false });
    expect(mutateMock).toBeCalledWith({
      variables: { input: { ids: [123] } },
      optimisticResponse: {
        removeCustomers: { ids: [123] },
      },
      update: instance.onUpdate,
    });
  });

  it('should remove customers from data, update cache and call onRemove callback', () => {
    const selectedCustomers = [{ id: 123 }];
    const onRemove = jest.fn();
    const isCustomerSelected = true;
    const storeMock = {
      readQuery: jest.fn().mockReturnValue({ customers: selectedCustomers }),
      writeQuery: jest.fn(),
    };
    const expectedData = {
      customers: [],
    };

    const result = shallow(
      <RemoveCustomerButton
        selected={selectedCustomers}
        onRemove={onRemove}
        isCustomerSelected={isCustomerSelected}
        intl={intl}
      />,
    );
    const instance = result.instance();
    instance.onUpdate(storeMock, { data: { removeCustomers: { ids: [123] } } });

    expect(storeMock.readQuery).toBeCalledWith({ query: CustomersListQuery });
    expect(storeMock.writeQuery).toBeCalledWith({ query: CustomersListQuery, data: expectedData });
    expect(instance.state).toEqual({ open: false });
    expect(onRemove).toBeCalled();
  });
});
