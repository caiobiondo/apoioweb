import CustomerForm from '../Form';

class NewCustomerForm extends CustomerForm {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        phones: [{}],
        addresses: [{}],
      },
      currentStep: 1,
    };

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

export default NewCustomerForm;
