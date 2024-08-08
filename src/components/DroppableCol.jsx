import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { handleAddItem, handleDeleteItem } from "../util/itemUtil";

export default function DroppableCol({
  colId,
  colData,
  columns,
  setColumns,
  getItemStyle,
  getListStyle,
  isDraggingOver,
  handleItemClick,
  selectedItems,
}) {
  const renderDraggableItem = (item, index) => {
    const isSelected = selectedItems.includes(item.id);
    const selectedCount = selectedItems.length;

    return (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleItemClick(event, item.id);
              }
            }}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              isDraggingOver,
              isSelected
            )}
            className="flex-grow flex justify-between relative"
          >
            {isSelected && selectedCount > 1 && snapshot.isDragging ? (
              <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedCount}
              </div>
            ) : (
              item.content
            )}
            {!snapshot.isDragging && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(colData, colId, item.id, setColumns);
                }}
              >
                삭제
              </div>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex justify-between gap-5">
        <div>{colData.name}</div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddItem(columns, setColumns);
          }}
          className="cursor-pointer"
        >
          {colId === "col1" ? "아이템 추가" : null}
        </div>
      </div>
      <Droppable droppableId={colId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {colData.items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                {renderDraggableItem(item, index)}
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
