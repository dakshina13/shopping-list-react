import SignUpForm from "../components/SignUp/SignUpForm";
import axios from "axios";
import { Fragment, useState } from "react";

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitRequest = async (name, email, password) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.message) {
          setIsLoading(false);
          setError(error.response.data.message);
        } else {
          setError("Error with Database");
        }
      });
  };
  return (
    <Fragment>
      {error && <p className="error centered">{error}</p>}
      <SignUpForm submitRequest={submitRequest} loading={isLoading} />
    </Fragment>
  );
};

export default SignUpPage;
