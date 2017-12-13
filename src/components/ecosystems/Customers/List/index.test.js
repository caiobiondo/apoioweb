import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import CustomersList from './index';

describe('CustomersList Ecosystem', () => {
  it('should render the customers list page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CustomersList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should set selectedCustomers to an empty array', () => {
    const originalState = { selectedCustomers: [{ id: 123 }] };
    const expectedState = { selectedCustomers: [] };

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onRemoveCustomer();

      expect(instance.state).toEqual(expectedState);
    });
  });

  it('should add customer to selected customers empty array', () => {
    const expectedState = { selectedCustomers: [{ id: 123 }] };
    const customer = { id: 123 };

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.onSelectCustomer(customer);

    expect(instance.state).toEqual(expectedState);
  });

  it('should add customer to selected customers', () => {
    const originalState = { selectedCustomers: [{ id: 123 }] };
    const expectedState = { selectedCustomers: [{ id: 123 }, { id: 124 }] };
    const customer = { id: 124 };

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onSelectCustomer(customer);

      expect(instance.state).toEqual(expectedState);
    });
  });

  it('should add a list of customers to selected customers', () => {
    const originalState = { selectedCustomers: [] };
    const expectedState = { selectedCustomers: [{ id: 124 }, { id: 125 }] };
    const customers = [{ id: 124 }, { id: 125 }];

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onSelectCustomer(customers);

      expect(instance.state).toEqual(expectedState);
    });
  });

  it('should remove a list of customers from selected customers', () => {
    const originalState = { selectedCustomers: [{ id: 124 }, { id: 125 }] };
    const expectedState = { selectedCustomers: [] };
    const customers = [];

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onSelectCustomer(customers);

      expect(instance.state).toEqual(expectedState);
    });
  });

  it('should remove a customer from selected customers', () => {
    const originalState = { selectedCustomers: [{ id: 124 }, { id: 125 }] };
    const expectedState = { selectedCustomers: [{ id: 125 }] };
    const customer = { id: 124 };

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onSelectCustomer(customer);

      expect(instance.state).toEqual(expectedState);
    });
  });

  it('should remove all customers from selected customers', () => {
    const originalState = { selectedCustomers: [{ id: 125 }] };
    const expectedState = { selectedCustomers: [] };
    const customer = [{ id: 125 }];

    const result = shallow(<CustomersList />);
    const instance = result.instance();
    instance.setState(originalState, () => {
      instance.onSelectCustomer(customer);

      expect(instance.state).toEqual(expectedState);
    });
  });
});
