import React, { useState } from "react";
import FormComponent from "../../../components/FormComponent";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';

import styles from "./common.module.scss";
import { USER_LIST } from "../../../devData/users";
import { userSignInSuccess } from "../modules";

const SignInForm = ({ history, dispatch, allUsers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState('');

  const handleSignIn = (evt) => {
    evt.preventDefault();

    if (!(email || password)) {
      setFormError('Please enter email or password');
    } else {
      const user = allUsers.find((user) => user.email === email);
      if (!user) {
        setFormError('User not found!');
        return;
      }
      if (password !== user.password) {
        setFormError('Incorrect Password!');
        return;
      };
      dispatch(userSignInSuccess(user));
      history.push('/feeds');
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <FormComponent
      type={"email"}
      label={"Email"}
      name={"email"}
      onChange={({ target }) => setEmail(target.value)}
      value={email}
      />
      <FormComponent
        className={styles.signInContainer__form_passwordInput}
        type={"password"}
        label={"Password"}
        onChange={({ target }) => setPassword(target.value)}
        value={password}
      />
      <div className={styles.signInContainer__form_forgotPassword}>
        <span>Forgot password?</span>
      </div>
      <div className={`${styles.signInContainer__form_formError} ${formError && styles.signInContainer__form_formError_hasError}` }>
        {formError}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type={"submit"}
          className={styles.signInContainer__form_submitBtn}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

const SignIn = ({ history, dispatch, allUsers }) => {
  return (
    <div className={styles.signInContainer}>
      <span className={styles.signInContainer__header_title}>Sign in</span>
      <span className={styles.signInContainer__header_title2}>
        Welcome back
      </span>
      <SignInForm allUsers={allUsers} dispatch={dispatch} history={history} />
      <div className={styles.signInContainer__link}>
        <span>
          <span className={styles.signInContainer__link_label}>
            Don't have an account?
          </span>
          <Link className={styles.signInContainer__link_text} to={"/signUp"}>
            &nbsp; Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allUsers: state.user.allUsers.allUsers,
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(SignIn);
