import React from "react";
import { DragDropContext as BeautifulDndContext } from "react-beautiful-dnd";
import DroppableCol from "./DroppableCol";
import useDragAndDrop from "../hook/useDragAndDrop";

export default function DragDropContext({
  columns,
  setColumns,
  onDragUpdate,
  onDragEnd,
  isDraggingOver,
  handleItemClick,
  selectedItems,
}) {
  return (
    <BeautifulDndContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <section className="m-10 flex justify-between">
        {Object.entries(columns).map(([colId, colData]) => (
          <div key={colId}>
            <DroppableCol
              colId={colId}
              colData={colData}
              columns={columns}
              setColumns={setColumns}
              getItemStyle={getItemStyle}
              getListStyle={getListStyle}
              isDraggingOver={isDraggingOver}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
            />
          </div>
        ))}
      </section>
    </BeautifulDndContext>
  );
}

const GRID = 8;

const getItemStyle = (
  isDragging,
  draggableStyle,
  isDraggingOver,
  isSelected
) => ({
  userSelect: "none",
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isSelected
    ? "lightgreen"
    : isDragging
    ? isDraggingOver
      ? "red"
      : "lightgreen"
    : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
});
