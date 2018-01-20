import { MagazinePagesQuery, MagazinePagesQueryOptions } from './MagazinePages.data';

describe('MagazinePagesQuery', () => {
  it('queries correctly', () => {
    expect(MagazinePagesQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      type: 'natura',
      region: '6',
      gv: 6,
    };

    // when
    const options = MagazinePagesQueryOptions.options(props);

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
