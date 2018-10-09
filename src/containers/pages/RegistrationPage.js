import React, { Component } from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { registration } from '../../store/actions/registration';
import RegistrationForm from '../../components/forms/RegistrationForm';

class RegistrationPage extends Component {

  onSubmit = (values) => this.props.registration({ input: values });

  componentWillReceiveProps(nextProps) {
    const {
      registrationState: {
        status
      },
      history: {
        push
      }
    } = this.props;

    if (!status && nextProps.registrationState.status) {
      setTimeout(() => push('/'), 2000);
    }
  }

  render() {
    const {
      classes,
      registrationState: {
        errors,
        isLoading,
        status
      }
    } = this.props;

    const values = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.heading}>REGISTRATION</Typography>
          <RegistrationForm
            isLoading={isLoading}
            values={values}
            requestError={errors}
            handleSubmit={this.onSubmit} />
          <Link className={classes.link} to="/">Back</Link>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={status}
          autoHideDuration={2000}
          message={<span id="message-id">Registration completed successfully</span>}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  registrationState: state.registration
})

const mapDispatchToProps = dispatch => ({
  registration: (payload) => dispatch(registration(payload))
});

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '300px',
    margin: ' 50px auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.4rem'
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    color: '#6fd7ff',
    marginTop: '20px',
    textAlign: 'center'
  }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegistrationPage));