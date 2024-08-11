import React from "react";

export default function MultipleButton({
  name,
  handleAddItem,
  handleDeleteItem,
  columns,
  setColumns,
  colData,
  itemId,
}) {
  const handleClick = (event) => {
    event.stopPropagation();

    if (name === "add") {
      handleAddItem(columns, setColumns);
    } else if (name === "delete") {
      handleDeleteItem(colData, itemId, setColumns);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {name}
    </button>
  );
}
