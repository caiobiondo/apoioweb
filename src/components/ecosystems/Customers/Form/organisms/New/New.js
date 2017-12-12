import CustomerForm from '../Form';
import { withRouter } from 'react-router-dom';

class NewCustomerForm extends CustomerForm {
  constructor(props) {
    super(props);

    Object.assign(this.state, {
      customer: {
        phones: [{}],
        addresses: [{}],
      },
    });

    this.getCustomer = this.getCustomer.bind(this);
    this.setCustomer = this.setCustomer.bind(this);
  }

  getCustomer() {
    return this.state.customer;
  }

  setCustomer(customer) {
    this.setState({ customer: customer });
  }
}

export default withRouter(NewCustomerForm);
