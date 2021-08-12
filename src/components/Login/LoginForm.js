import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [error, setError] = useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log("Email " + enteredEmail);
    console.log("Password " + enteredPassword);
    if (enteredEmail === "" || enteredPassword === "") {
      setError("Please enter all inputs!");
      return;
    }
    if (enteredPassword.length < 6) {
      setError("Password is less than 6 characters!");
      return;
    }
  };

  return (
    <Fragment>
      <div className={classes.card}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className={classes.loginSpan}>
            <Link to="/signUp">Need to register?</Link>
          </div>
          <div className={classes.actions}>
            <button className="btn">Login</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
