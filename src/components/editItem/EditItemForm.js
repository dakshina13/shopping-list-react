import { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./EditItemForm.module.css";

const AddItemForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpPost, setHttpPost] = useState("uncomplete");

  const histroy = useHistory();
  const params = useParams();

  const { id } = params;
  const getItem = useCallback(async () => {
    console.log("id " + id);
    const body = { id: id };
    try {
      const response = await fetch("http://localhost:5000/item", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setError("Error with database");
        setIsLoading(false);
        return;
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
      setNameInput(data.name);
      setQuantityInput(data.quantity);
    } catch (error) {}
  }, [id]);

  async function editItem() {
    setIsLoading(true);
    const item = { name: nameInput, quantity: quantityInput, id: id };
    try {
      const response = await fetch("http://localhost:5000/edit-item", {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setError("Error with database");
        setIsLoading(false);
        return;
      }
      const data = await response.data;
      console.log(data);
      setHttpPost("completed");
    } catch (error) {
      console.log("Something went wrong!");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getItem();
    if (httpPost === "completed") {
      histroy.push("/list");
    }
  }, [getItem, httpPost, histroy,setNameInput,setQuantityInput]);

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
        {error && <p className="center-text error">{error}</p>}
        <form className={classes.form} onSubmit={submitFormHandler}>
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
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

export default AddItemForm;
