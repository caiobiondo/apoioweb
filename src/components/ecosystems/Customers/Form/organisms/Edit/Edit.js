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
    return { customer: props.customer };
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
