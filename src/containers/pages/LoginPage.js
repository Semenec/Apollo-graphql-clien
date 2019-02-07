import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

import { login } from "../../store/actions/login";
import LoginForm from "../../components/forms/LoginForm";

class LoginPage extends Component {
  onSubmit = values => {
    this.props.login(values);
  };

  render() {
    const {
      classes,
      loginState: {
        errors,
        isLoading,
        user: { message }
      }
    } = this.props;

    const values = {
      email: "",
      password: ""
    };

    return (
      <div className={classes.container}>
        <Paper className={classes.root} elevation={1}>
          <Typography component="h2" className={classes.heading}>
            LOGIN
          </Typography>
          <LoginForm
            isLoading={isLoading}
            values={values}
            requestError={errors}
            handleSubmit={this.onSubmit}
          />
          <Link className={classes.link} to="/registration">
            Create new account
          </Link>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={message || false}
          autoHideDuration={2000}
          message={<span id="message-id">{message || ""}</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.login
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(login(payload))
});

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "300px",
    margin: " 50px auto"
  },
  heading: {
    textAlign: "center",
    fontSize: "1.4rem"
  },
  link: {
    textDecoration: "none",
    display: "block",
    color: "#6fd7ff",
    marginTop: "20px",
    textAlign: "center"
  }
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
