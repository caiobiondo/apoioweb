import React from 'react';
import { shallow } from 'enzyme';
import { BaseFormSearch } from './BaseFormSearch';
import toJson from 'enzyme-to-json';

const baseFormSearchProps = {
  onSearch: jest.fn(),
  searchValue: '',
  sectionTitle: { iconName: 'ico_add_customer', value: 'myCustomers' },
  description: 'customersSearchInfo',
  inputLabel: 'customerName',
};

describe('BaseFormSearch Organism', () => {
  it('should render input and submit button', () => {
    const result = shallow(<BaseFormSearch {...baseFormSearchProps} />);

    expect(toJson(result)).toMatchSnapshot();
  });

  it("should update state's name with value", () => {
    const expectedName = 'a name';

    const result = shallow(<BaseFormSearch {...baseFormSearchProps} />);
    const instance = result.instance();
    instance.handleNameChange(null, expectedName);

    expect(instance.state.name).toEqual(expectedName);
  });

  it('should call onSearch with filters', () => {
    const event = {
      stopPropagation: jest.fn(),
    };
    const name = 'a name';

    const result = shallow(<BaseFormSearch {...baseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onSubmit(event);

    expect(baseFormSearchProps.onSearch).toBeCalledWith({ name });
    expect(event.stopPropagation).toBeCalled();
  });

  it('should call onSearch with filters when enter is pressed', () => {
    const event = {
      key: 'Enter',
    };
    const name = 'a name';

    const result = shallow(<BaseFormSearch {...baseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onKeyPress(event);

    expect(baseFormSearchProps.onSearch).toBeCalledWith({ name });
  });

  it('should not call onSearch with filters when enter is not pressed', () => {
    const onSearch = jest.fn();
    const newBaseFormSearchProps = { ...baseFormSearchProps, onSearch };
    const event = {
      key: 'K',
    };
    const name = 'a name';

    const result = shallow(<BaseFormSearch {...newBaseFormSearchProps} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onKeyPress(event);

    expect(newBaseFormSearchProps.onSearch).not.toBeCalled();
  });
});
