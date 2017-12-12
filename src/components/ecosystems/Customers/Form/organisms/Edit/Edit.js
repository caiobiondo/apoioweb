import CustomerForm from '../Form';
import { withRouter } from 'react-router-dom';

class EditCustomerForm extends CustomerForm {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.customer = { id: id };
    this.getCustomer = this.getCustomer.bind(this);
  }

  getCustomer() {
    return this.customer;
  }
}

export default withRouter(EditCustomerForm);
