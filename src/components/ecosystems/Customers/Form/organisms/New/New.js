import CustomerForm from '../Form';
import { withRouter } from 'react-router-dom';
import { CreateCustomerMutation } from './New.data';
import { graphql } from 'react-apollo';
import { withFormik } from 'formik';
import validateForm from '../../../Validators/Form';

class NewCustomerForm extends CustomerForm {}

const NewCustomerFormWithMutation = graphql(CreateCustomerMutation)(NewCustomerForm);

const NewCustomerFormWithFormik = withFormik({
  mapPropsToValues: props => {
    return {
      customer: {
        phones: [{}],
        addresses: [{}],
        emails: [{}],
      },
    };
  },
  enableReinitialize: true,
  validate: values => {
    return {
      customer: validateForm(values.customer),
    };
  },
})(NewCustomerFormWithMutation);

export { NewCustomerFormWithFormik as NewCustomerForm };
export default withRouter(NewCustomerFormWithFormik);
