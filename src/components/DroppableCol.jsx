import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { handleAddItem, handleDeleteItem } from "../util/itemUtil";
import DraggableItem from "./DraggableItem";
import MultipleButton from "./button/MultipleButton";

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
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex justify-between gap-5">
        <div>{colData.name}</div>
        <MultipleButton
          name="add"
          handleAddItem={handleAddItem}
          handleDeleteItem={handleDeleteItem}
          columns={columns}
          setColumns={setColumns}
          colData={colData}
        />
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
                <DraggableItem
                  key={item.id}
                  item={item}
                  index={index}
                  getItemStyle={getItemStyle}
                  isDraggingOver={isDraggingOver}
                  handleItemClick={handleItemClick}
                  handleDeleteItem={handleDeleteItem}
                  selectedItems={selectedItems}
                  colData={colData}
                  setColumns={setColumns}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
