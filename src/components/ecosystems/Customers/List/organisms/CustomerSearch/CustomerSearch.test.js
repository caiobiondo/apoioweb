import React from 'react';
import { shallow } from 'enzyme';
import { CustomerSearch } from './CustomerSearch';
import toJson from 'enzyme-to-json';

describe('CustomerSearch Organism', () => {
  it('should render input and submit button', () => {
    const onSearch = jest.fn();

    const result = shallow(<CustomerSearch onSearch={onSearch} />);

    expect(toJson(result)).toMatchSnapshot();
  });

  it("should update state's name with value", () => {
    const onSearch = jest.fn();
    const expectedName = 'a name';

    const result = shallow(<CustomerSearch onSearch={onSearch} />);
    const instance = result.instance();
    instance.handleNameChange(null, expectedName);

    expect(instance.state.name).toEqual(expectedName);
  });

  it('should call onSearch with filters', () => {
    const onSearch = jest.fn();
    const event = {
      stopPropagation: jest.fn(),
    };
    const name = 'a name';

    const result = shallow(<CustomerSearch onSearch={onSearch} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onSubmit(event);

    expect(onSearch).toBeCalledWith({ name });
    expect(event.stopPropagation).toBeCalled();
  });

  it('should call onSearch with filters when enter is pressed', () => {
    const onSearch = jest.fn();
    const event = {
      key: 'Enter',
    };
    const name = 'a name';

    const result = shallow(<CustomerSearch onSearch={onSearch} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onKeyPress(event);

    expect(onSearch).toBeCalledWith({ name });
  });

  it('should not call onSearch with filters when enter is not pressed', () => {
    const onSearch = jest.fn();
    const event = {
      key: 'K',
    };
    const name = 'a name';

    const result = shallow(<CustomerSearch onSearch={onSearch} />);
    const instance = result.instance();
    instance.setState({ name });
    instance.onKeyPress(event);

    expect(onSearch).not.toBeCalled();
  });
});
