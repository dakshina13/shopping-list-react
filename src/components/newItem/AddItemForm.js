import { Fragment, useState } from "react";

import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./AddItemForm.module.css";

const AddItemForm = (props) => {
  function submitFormHandler(event) {
    event.preventDefault();

    // optional: Could validate here
  }

  return (
    <Fragment>
      <div className={classes.card}>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Name</label>
            <input type="text" id="author" />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Quantity</label>
            <input type="number" />
          </div>
          <div className={classes.actions}>
            <button className="btn">Add Item</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddItemForm;
