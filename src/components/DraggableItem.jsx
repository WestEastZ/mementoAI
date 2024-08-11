import React from "react";
import { Draggable } from "react-beautiful-dnd";
import MultipleButton from "./button/MultipleButton";

export default function DraggableItem({
  item,
  index,
  getItemStyle,
  isDraggingOver,
  handleItemClick,
  handleDeleteItem,
  selectedItems,
  colData,
  setColumns,
}) {
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
            <MultipleButton
              name="delete"
              handleDeleteItem={handleDeleteItem}
              colData={colData}
              itemId={item.id}
              setColumns={setColumns}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
