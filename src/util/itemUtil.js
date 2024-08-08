export const handleAddItem = (columns, setColumns) => {
  const itemsId = Object.values(columns).flatMap((col) =>
    col.items.map((item) => parseInt(item.id, 10))
  );
  let maxId = Math.max(...itemsId);

  if (!itemsId.length) {
    maxId = 0;
  }

  const newItem = {
    id: `${maxId + 1}`,
    content: `item ${maxId + 1}`,
  };
  setColumns((prevCol) => ({
    ...prevCol,
    col1: {
      ...prevCol.col1,
      items: [...prevCol.col1.items, newItem],
    },
  }));
};

export const handleDeleteItem = (colData, colId, itemId, setColumns) => {
  setColumns((prev) => {
    const updatedItems = prev[colData.name].items.filter(
      (item) => item.id !== itemId
    );

    return {
      ...prev,
      [colData.name]: {
        ...prev[colData.name],
        items: updatedItems,
      },
    };
  });
};
