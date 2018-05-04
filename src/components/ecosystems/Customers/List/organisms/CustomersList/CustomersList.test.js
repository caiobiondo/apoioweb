import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { CustomersList } from './CustomersList';
import toJson from 'enzyme-to-json';

describe('CustomersList Organism', () => {
  it('should render a loading', () => {
    const renderer = new ShallowRenderer();
    const onSelect = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: true,
      customers: null,
    };

    renderer.render(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render an empty indicator', () => {
    const renderer = new ShallowRenderer();
    const onSelect = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [],
    };

    renderer.render(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a customers list', () => {
    const selectedCustomers = [];
    const filters = {};
    const data = {
      loading: false,
      customers: [
        {
          id: 123,
          name: 'a name',
          nickname: 'a nickname',
          emails: [{ email: 'an-email' }],
          phones: [{ phone: 'a-phone', provider: 'a provider' }],
        },
      ],
    };

    const result = shallow(
      <CustomersList filters={filters} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers, filters });
    result.update();

    expect(toJson(result)).toMatchSnapshot();
  });

  it('should render customers list filtered by name ', () => {
    const selectedCustomers = [];
    const filters = {
      name: 'anoth',
    };
    const data = {
      loading: false,
      customers: [
        {
          id: 123,
          name: 'a name',
          nickname: 'a nickname',
          emails: [{ email: 'an-email' }],
          phones: [{ phone: 'a-phone', provider: 'a provider' }],
        },
        {
          id: 124,
          name: 'another name',
          nickname: null,
          emails: [{ email: 'an-another-email' }],
          phones: [{ phone: 'an-another-phone', provider: 'a provider' }],
        },
      ],
    };
    global.dataLayer = {
      push: jest.fn(),
    };

    const result = shallow(
      <CustomersList filters={filters} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers, filters });
    result.update();

    expect(toJson(result)).toMatchSnapshot();
  });

  it('should render select all', () => {
    const onSelect = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [
        {
          id: 123,
          name: 'a name',
          nickname: 'a nickname',
          emails: [{ email: 'an-email' }],
          phones: [{ phone: 'a-phone', provider: 'a provider' }],
        },
      ],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const selectAll = instance.renderSelectAll();

    expect(selectAll).toMatchSnapshot();
  });

  it('should call selectAllCustomers when select all is clicked', () => {
    const onSelect = jest.fn();
    const selectAllCustomersMock = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [
        {
          id: 123,
          name: 'a name',
          nickname: 'a nickname',
          emails: [{ email: 'an-email' }],
          phones: [{ phone: 'a-phone', provider: 'a provider' }],
        },
      ],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.selectAllCustomers = selectAllCustomersMock;
    const selectAll = instance.renderSelectAll();

    selectAll.props.onClick();

    expect(selectAllCustomersMock).toBeCalled();
  });

  it('should render select when not selected', () => {
    const onSelect = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [
        {
          id: 123,
          name: 'a name',
          nickname: 'a nickname',
          emails: [{ email: 'an-email' }],
          phones: [{ phone: 'a-phone', provider: 'a provider' }],
        },
      ],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const select = instance.renderSelect({ row: data.customers[0] });

    expect(select).toMatchSnapshot();
  });

  it('should render select when selected', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [customer];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const select = instance.renderSelect({ row: customer });

    expect(select).toMatchSnapshot();
  });

  it('should call selectCustomer when select is clicked', () => {
    const onSelect = jest.fn();
    const selectCustomerMock = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [customer];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.selectCustomer = selectCustomerMock;
    const select = instance.renderSelect({ row: customer });

    select.props.onClick();

    expect(selectCustomerMock).toBeCalledWith(customer);
  });

  it('should render name cell', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const nameCell = instance.renderName({ row: customer, value: 'a name' });

    expect(nameCell).toMatchSnapshot();
  });

  it('should render name cell with avatar', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
      avatar: 'an avatar',
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const nameCell = instance.renderName({ row: customer, value: 'a name' });

    expect(nameCell).toMatchSnapshot();
  });

  it('should render default cell', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const cell = instance.renderCell({ row: customer, value: 'a value' });

    expect(cell).toMatchSnapshot();
  });

  it('should render default cell with null value', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    const cell = instance.renderCell({ row: customer, value: null });

    expect(cell).toMatchSnapshot();
  });

  it('should call onSelect callback with selected customer', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.selectCustomer(customer);

    expect(onSelect).toBeCalledWith(customer);
  });

  it('should call onSelect callback with selected customers', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.selectAllCustomers();

    expect(onSelect).toBeCalledWith([customer]);
  });

  it('should parse customers and update internal data state', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers });

    expect(instance.state.data).toMatchSnapshot();
  });

  it('should parse customers and update internal data state (with undefined customers)', () => {
    const onSelect = jest.fn();
    const selectedCustomers = [];
    const data = {
      loading: false,
      customers: null,
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers });

    expect(instance.state.data).toMatchSnapshot();
  });

  it('should parse customers and update internal data state (with selected customer)', () => {
    const onSelect = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [customer];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList onSelect={onSelect} selectedCustomers={selectedCustomers} data={data} />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers });

    expect(instance.state.data).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    const onLoadFinished = jest.fn();
    const customer = {
      id: 123,
      name: 'a name',
      nickname: 'a nickname',
      emails: [{ email: 'an-email' }],
      phones: [{ phone: 'a-phone', provider: 'a provider' }],
    };
    const selectedCustomers = [customer];
    const data = {
      loading: false,
      customers: [customer],
    };

    const result = shallow(
      <CustomersList
        onLoadFinished={onLoadFinished}
        selectedCustomers={selectedCustomers}
        data={data}
      />,
    );
    const instance = result.instance();
    instance.componentWillReceiveProps({ data, selectedCustomers });

    expect(onLoadFinished).toBeCalledWith(false, false);
  });
});
