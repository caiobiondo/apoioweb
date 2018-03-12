import { UserDataQuery } from './withUserData.data';

describe('UserDataQuery', () => {
  it('should be the correct query', () => {
    expect(UserDataQuery).toMatchSnapshot();
  });
});
