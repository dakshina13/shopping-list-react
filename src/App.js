import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Shopping from "./pages/Shopping";
import AddItem from "./pages/AddItem";
import NoPageFound from "./pages/NoPageFound";
import EditItem from "./pages/EditItem";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <Fragment>
      <MainNavigation />
      <main className="main-div">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/list" />
          </Route>
          <Route path="/list">
            <Shopping />
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
          <Route path="/edit/:id">
            <EditItem />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signUp">
            <SignUpPage />
          </Route>
          <Route path="*">
            <NoPageFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
