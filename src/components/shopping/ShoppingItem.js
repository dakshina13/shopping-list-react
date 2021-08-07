import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import classes from "./ShoppingItem.module.css";

const ShoppingItem = (props) => {
  const histroy = useHistory();

  async function deleteItem() {
    const body = { id: props.id };
    try {
      const response = await fetch("http://localhost:5000/delete-item", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      histroy.push("/list");
    } catch (error) {}
  }
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.quantity}</figcaption>
      </figure>
      <Link className="btn" to={`/edit/${props.id}`}>
        Edit
      </Link>
      <button className="delete-btn btn" onClick={deleteItem}>
        Delete
      </button>
    </li>
  );
};

export default ShoppingItem;
