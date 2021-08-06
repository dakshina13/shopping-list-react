import ShoppingItem from "./ShoppingItem";
import classes from "./ShoppingList.module.css";

const ShoppingList = (props) => {
  const shoppingList = props.list;

  return (
    <ul className={classes.list}>
      {shoppingList.map((item) => (
        <ShoppingItem
          key={item._id}
          id={item.id}
          text={item.name}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );
};

export default ShoppingList;
