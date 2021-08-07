import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Shopping from "./pages/Shopping";
import AddItem from "./pages/AddItem";
import NoPageFound from "./pages/NoPageFound";
import EditItem from "./pages/EditItem";

function App() {
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
          <Route path="*">
            <NoPageFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
