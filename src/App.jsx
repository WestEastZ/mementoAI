import React from "react";
import useDragAndDrop from "./hook/useDragAndDrop";
import DragDropContext from "./components/DragDropContext";

export default function App() {
  const {
    columns,
    setColumns,
    onDragUpdate,
    onDragEnd,
    isDraggingOver,
    handleItemClick,
  } = useDragAndDrop();

  return (
    <DragDropContext
      columns={columns}
      setColumns={setColumns}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
      isDraggingOver={isDraggingOver}
      handleItemClick={handleItemClick}
    />
  );
}
