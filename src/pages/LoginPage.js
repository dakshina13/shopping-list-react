import axios from "axios";
import { Fragment, useState } from "react";

import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitRequest = async (email, password) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response);
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Error with Database");
        }
      });
  };
  return (
    <Fragment>
      {error && <p className="centered error">{error}</p>}
      <LoginForm submitRequest={submitRequest} loading={isLoading}/>
    </Fragment>
  );
};

export default LoginPage;
