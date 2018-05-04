import React from 'react';
import { shallow } from 'enzyme';
import { PreviousMagazines } from './PreviousMagazines';
import { MagazineCoverWrapper } from './PreviousMagazines.styles';

describe('PreviousMagazines', () => {
  it('should call openMagazine and redirect to a new router', () => {
    const historyPush = jest.fn();
    const props = {
      history: {
        push: historyPush,
      },
      magazines: [
        {
          id: 1,
          period: '',
          title: '',
          highlightImage: '',
        },
      ],
      type: 'natura',
    };
    global.dataLayer = {
      push: jest.fn(),
    };

    const result = shallow(<PreviousMagazines {...props} />);
    const magazineCover = result.find(MagazineCoverWrapper).first();
    magazineCover.simulate('click');

    expect(historyPush).toBeCalledWith(`/magazines/view/natura/1`);
  });
});
