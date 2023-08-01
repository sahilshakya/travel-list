import { useState } from "react";

export default function Form({ onAddItem }) {
  const [descp, setDesp] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!descp) {
      return;
    }

    const newItem = { descp, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);
    setDesp("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={descp}
        onChange={(e) => setDesp(e.target.value)}
      />
      <button> Add</button>
    </form>
  );
}
