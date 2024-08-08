import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { handleAddItem, handleDeleteItem } from "../util/itemUtil";
import useDragAndDrop from "../hook/useDragAndDrop";

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
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddItem(columns, setColumns);
          }}
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
                <Draggable draggableId={item.id} index={index}>
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
                        {
                          backgroundColor: selectedItems.includes(item.id)
                            ? "lightgreen"
                            : "grey",
                        }
                      )}
                      className="flex-grow flex justify-between"
                    >
                      {item.content}
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // 이벤트 버블링 중지
                          handleDeleteItem(colData, colId, item.id, setColumns);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
