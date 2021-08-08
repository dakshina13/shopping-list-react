import { Fragment, useCallback, useEffect, useState } from "react";
import ShoppingList from "../components/shopping/ShoppingList";

const Shopping = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/shopping");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function deleteItem(itemId) {
    const body = { id: itemId };
    try {
      const response = await fetch("http://localhost:5000/delete-item", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {}
    fetchItems();
  }

  return (
    <Fragment>
      {error && <p className="centered">{error}</p>}
      {!isLoading && <ShoppingList list={items} onDelete={deleteItem} />}
    </Fragment>
  );
};

export default Shopping;
