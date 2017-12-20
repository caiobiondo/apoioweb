import { CreateCustomerMutation } from './New.data';

describe('CreateCustomerMutation', () => {
  it('should be the correct mutation', () => {
    expect(CreateCustomerMutation).toMatchSnapshot();
  });
});
