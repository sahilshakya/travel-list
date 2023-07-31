import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );

    function handleClear() {
      setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClear }) {
  return (
    <div className="list">
      <div>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>

      <div className="actions">
        <select>
          <option value="input"> Sort by input order</option>
          <option value="description"> Sort bydescription</option>
          <option value="packed"> Sort by packed status</option>
        </select>
      </div>
      <div className="actions">
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <div>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>You have nothing on the list</em>
      </footer>
    );
  }
  const numItems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percentage = (numpacked / numItems) * 100;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You've got everything"
          : `You have ${numItems} items on your list and you already packed${numpacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
