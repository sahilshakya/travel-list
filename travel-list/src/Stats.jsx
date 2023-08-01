export default function Stats({ items }) {
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
