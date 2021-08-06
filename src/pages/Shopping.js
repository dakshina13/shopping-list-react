import ShoppingList from "../components/shopping/ShoppingList";

const Shopping = () => {
  const DUMMY_LIST = [
    { name: "abcd", quantity: 10 },
    { name: "efgh", quantity: 16 },
  ];

  return <ShoppingList list={DUMMY_LIST} />;
};

export default Shopping;
