import CustomerForm from '../Form';
import { UpdateCustomerMutation, FindCustomerQuery, FindCustomerQueryOptions } from './Edit.data';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import validateForm from '../../../Validators/Form';

class EditCustomerForm extends CustomerForm {
  render() {
    if (this.props.loading || !this.props.customer) {
      return null;
    }

    return super.render();
  }
}

const EditCustomerFormWithFormik = withFormik({
  mapPropsToValues: props => {
    if (!props.customer) {
      return { customer: null };
    }

    const addresses = props.customer.addresses || [];
    const phones = props.customer.phones || [];
    const emails = props.customer.emails || [];
    return {
      customer: {
        ...props.customer,
        addresses: addresses.map(address => {
          return { ...address };
        }),
        phones: phones.map(phone => {
          return { ...phone };
        }),
        emails: emails.map(email => {
          return { ...email };
        }),
      },
    };
  },
  enableReinitialize: true,
  validate: values => {
    return {
      customer: validateForm(values.customer),
    };
  },
})(EditCustomerForm);

const EditCustomerFormWithMutation = graphql(UpdateCustomerMutation)(EditCustomerFormWithFormik);

const EditCustomerFormWithData = graphql(FindCustomerQuery, FindCustomerQueryOptions)(
  EditCustomerFormWithMutation,
);
export { EditCustomerFormWithFormik as EditCustomerForm };
export default withRouter(EditCustomerFormWithData);
