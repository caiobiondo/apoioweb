import { MagazinesQuery, MagazinesQueryOptions } from './Magazines.data';

describe('MagazinesQuery', () => {
  it('queries correctly', () => {
    expect(MagazinesQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      type: 'natura',
      region: '6',
      gv: 6,
    };

    // when
    const options = MagazinesQueryOptions.options(props);

    // then
    expect(options).toEqual({
      variables: {
        type: props.type,
        region: props.region,
        gv: props.gv,
      },
    });
  });
});
