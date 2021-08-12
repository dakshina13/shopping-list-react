import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const logoutHandler = () => {};

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Shopping List</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/login" activeClassName={classes.active}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" activeClassName={classes.active}>
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/addItem" activeClassName={classes.active}>
              Add Item
            </NavLink>
          </li>
          <li>
            <button className={classes.btn} onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
