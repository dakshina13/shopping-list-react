import { useEffect, useCallback, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import EditItemForm from "../components/editItem/EditItemForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const EditItem = () => {
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getItem = useCallback(async () => {
    console.log("id " + id);
    const body = { id: id };
    try {
      const response = await fetch("http://localhost:5000/item", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      setIsLoading(false);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        setError(data.message);
        return;
      }
      console.log(response);
      console.log(data);
      setItem(data);
    } catch (error) {}
  }, [id]);
  
  useEffect(() => {
    getItem();
  }, [getItem]);

  return (
    <Fragment>
      {isLoading && (
        <div className="loading">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="center-text error">{error}</p>}
      {!isLoading && !error && (
        <EditItemForm name={item.name} quantity={item.quantity} id={item._id} />
      )}
    </Fragment>
  );
};

export default EditItem;
