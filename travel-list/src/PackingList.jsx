import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClear,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;

  if (sortBy === "input") {
    sortedItem = items;
  }
  if (sortBy === "description") {
    sortedItem = items.slice().sort((a, b) => a.descp.localeCompare(b.descp));
  }

  if (sortBy === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <div>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
