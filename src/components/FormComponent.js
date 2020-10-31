import React from "react";
import styles from "./FormComponent.module.scss";

const TextInput = (props) => <input type='text' {...props} />;

const PasswordInput = (props) => <input type='password' {...props} />;

const FormComponent = ({ type, label, className, ...rest }) => {
  let content = null;
  switch (type) {
    case "email":
      return (
        <React.Fragment>
          <label htmlFor={label} />
          <TextInput
            type={"email"}
            placeholder={label}
            className={`${styles.input} ${className}`}
            {...rest}
          />
        </React.Fragment>
      );

    case "text":
      return (
        <React.Fragment>
          <label htmlFor={label} />
          <TextInput
            placeholder={label}
            className={`${styles.input} ${className}`}
            {...rest}
          />
        </React.Fragment>
      );

    case "password":
      return (
        <React.Fragment>
          <label htmlFor={label} />
          <PasswordInput
            placeholder={label}
            className={`${styles.input} ${className}`}
            {...rest}
          />
        </React.Fragment>
      );
    default:
      return content;
  }
};

export default FormComponent;
