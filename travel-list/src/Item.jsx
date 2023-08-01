export default function Item({ item, onDeleteItem, onToggleItem }) {
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
