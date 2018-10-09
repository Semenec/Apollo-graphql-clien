import React from "react";
import { withFormik } from "formik";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const Yup = require("yup");

class LoginForm extends React.Component {
  render() {
    let {
      handleSubmit,
      handleChange,
      isLoading,
      values,
      errors,
      requestError,
      classes
    } = this.props;

    return (
      <form className="container" onSubmit={handleSubmit}>
        <FormControl error={errors.email ? true : false} className={classes.input} required fullWidth>
          <InputLabel>Email</InputLabel>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange} />
          <FormHelperText error={errors.email ? true : false}>{errors.email && errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel error={errors.password ? true : false} required>Password</InputLabel>
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange} />
          <FormHelperText error={errors.password ? true : false}>{errors.password && errors.password}</FormHelperText>
        </FormControl>
        <div className={classes.errorRequest}>{requestError && requestError.graphQLErrors[0].message}</div>
        <Button disabled={isLoading} className={classes.submitButton} type="submit" variant="contained" color="primary" fullWidth >
          {isLoading ? <CircularProgress size={16} color="primary" /> : "Login"}
        </Button>
      </form>
    );
  }
}

const styles = theme => ({
  input: {
    margin: '10px 0'
  },
  submitButton: {
    marginTop: '30px'
  },
  errorRequest: {
    margin: '10px 0',
    fontSize: '0.875rem',
    color: 'red'
  }
});

const EnhansedDemoForm = withFormik({
  mapPropsToValues: props => props.values,
  validationSchema: Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Required")
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    props.handleSubmit(values, setSubmitting);
  },
  displayName: "LoginForm"
})(LoginForm);

export default withStyles(styles)(EnhansedDemoForm);