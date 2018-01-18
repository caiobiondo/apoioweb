import React from 'react';
import { shallow } from 'enzyme';
import { CurrentMagazine } from './CurrentMagazine';

describe('CurrentMagazine', () => {
  it('should call downloadMagazine and open pdfFile ', () => {
    global.open = jest.fn();

    const props = {
      magazine: {
        pdfFile: 'http://download-url.com',
      },
    };

    const result = shallow(<CurrentMagazine {...props} />);
    const instance = result.instance();
    instance.downloadMagazine();

    expect(global.open).toBeCalledWith(props.magazine.pdfFile);
  });

  it('should call openMagazine and redirect to a new router', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
      magazine: {
        id: '6',
      },
    };

    const result = shallow(<CurrentMagazine {...props} />);
    const instance = result.instance();
    instance.openMagazine();

    expect(props.history.push).toBeCalledWith(`/magazines/view/6`, { magazine: props.magazine });
  });

  it('should call additionalInfoOpened when change the screen for mobile show a button for hide options', () => {
    const props = {
      magazine: {},
    };

    const result = shallow(<CurrentMagazine {...props} />);
    const instance = result.instance();
    instance.toggleAdditionalInfo();

    expect(instance.state.additionalInfoOpened).toBeTruthy();
  });
});
