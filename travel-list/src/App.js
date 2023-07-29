import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 4, description: "nosocks", quantity: 122, packed: true },
  { id: 3, description: "nosocks", quantity: 122, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form() {
  const [descp, setDesp] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!descp) {
      return;
    }

    const newItem = { descp, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setDesp();
    setQuantity();
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

function PackingList() {
  return (
    <div className="list">
      {initialItems.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item }) {
  return (
    <div>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>x</button>
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
