import React, { useState } from "react";
import styles from "./common.module.scss";
import { Link } from "react-router-dom";
import FormComponent from "../../../components/FormComponent";
import { USER_LIST } from "../../../devData/users";
import { connect } from "react-redux";
import { userSignUp } from "../modules";

const SignUpForm = ({ history, dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [formError, setFormError] = useState('');
  const formNotFilled = email || password || confirmPassword || fullName;

  const handleSignUp = (evt) => {
    evt.preventDefault();

    if (!(formNotFilled)) {
      setFormError('Please enter all details!');
    } else {
      const user = USER_LIST.find((usr) => usr.email === email);
      if (user) {
        setFormError('Oops, account with this email already exists! Try again with different email!');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Password and confirm password does not match!');
      };
      dispatch(userSignUp({ email, password, name: fullName }));
      history.push('/');
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      <FormComponent
        onChange={({ target }) => setEmail(target.value)}
        type={"email"}
        label={"Email"}
        name={"email"}
      />
      <FormComponent
        onChange={({ target }) => setPassword(target.value)}
        type={"password"}
        label={"Password"}
        name={"password"}
      />
      <FormComponent
        onChange={({ target }) => setConfirmPassword(target.value)}
        type={"password"}
        name={"confirmPassword"}
        label={"Confirm Password"}
      />
      <FormComponent
        onChange={({ target }) => setFullName(target.value)}
        type={"text"}
        label={"Full Name"}
        name={"fullName"}
        className={styles.signUpContainer__fullName}
      />
      <div
        className={`${styles.signInContainer__form_formError} ${
          formError && styles.signInContainer__form_formError_hasError
        }`}
      >
        {formError}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type='submit'
          className={styles.signInContainer__form_submitBtn}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

const SignUp = ({ history, dispatch }) => {
  return (
    <div className={styles.signInContainer}>
      <span className={styles.signInContainer__header_title}>Sign up</span>
      <span className={styles.signInContainer__header_title2}>
        Create Account for Camp K12
      </span>
      <SignUpForm history={history} dispatch={dispatch} />
      <div className={styles.signInContainer__link}>
        <span>
          <span className={styles.signInContainer__link_label}>
            Already have an account?
          </span>
          <Link className={styles.signInContainer__link_text} to={"/"}>
            &nbsp; Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default connect()(SignUp);
