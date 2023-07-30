import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItem }) {
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
      <h3>what do you need</h3>
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

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      {items.map((item) => (
        <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
      ))}
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <div>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.descp}
      </span>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        x
      </button>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your listm and you already packed X</em>
    </footer>
  );
}
