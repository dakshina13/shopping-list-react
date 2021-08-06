import { Link } from "react-router-dom";

import classes from "./ShoppingItem.module.css";

const ShoppingItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.quantity}</figcaption>
      </figure>
      <Link className="btn" >
        Edit
      </Link>
      <Link className="delete-btn btn" >
        Delete
      </Link>
    </li>
  );
};

export default ShoppingItem;
