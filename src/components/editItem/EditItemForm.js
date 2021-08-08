import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./EditItemForm.module.css";

const EditItemForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");

  const [httpPost, setHttpPost] = useState("uncomplete");
  const [error, setError] = useState(null);

  const histroy = useHistory();

  async function editItem() {
    const item = { name: nameInput, quantity: quantityInput, id: props.id };
    try {
      const response = await fetch("http://localhost:5000/edit-item", {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        console.log(response);
        return;
      }
      const data = await response.data;
      console.log(data);
      setHttpPost("completed");
    } catch (error) {
      console.log("Something went wrong!");
    }
  }

  useEffect(() => {
    setNameInput(props.name);
    setQuantityInput(props.quantity);
    if (httpPost === "completed") {
      histroy.push("/list");
    }
  }, [httpPost, histroy, props]);

  function submitFormHandler(event) {
    event.preventDefault();
    setError(null);
    // optional: Could validate here
    if (nameInput === "" || quantityInput === "" || quantityInput < 0) {
      setError("Please enter a valid input!");
      return;
    }

    console.log("Name Input " + nameInput);
    console.log("Quantity " + quantityInput);
    editItem();
  }
  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };
  const quantityChangeHandler = (event) => {
    setQuantityInput(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.card}>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {error && <p className="center-text error">{error}</p>}
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={nameInput}
              onChange={nameChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="number">Quantity</label>
            <input
              id="number"
              type="number"
              value={quantityInput}
              onChange={quantityChangeHandler}
            />
          </div>
          <div className={classes.actions}>
            <button className="btn">Save Item</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditItemForm;
