import { useCallback, useEffect, useState } from "react";
import AddItemForm from "../components/newItem/AddItemForm";

const AddItem = () => {
  const [category, setCategory] = useState(null);

  const getCategory = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      console.log(data);
      setCategory(data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return <AddItemForm categories={category} />;
};

export default AddItem;
