import React, { useCallback, useRef, useState } from "react";
import { ColumnData } from "../ColumnData";
import { canMoveItem, reorder } from "../util/dragUtil";

export default function useDragAndDrop() {
  const [columns, setColumns] = useState(ColumnData);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const draggedItemRef = useRef(null);

  // Item Select Toggle
  const toggleItemSelect = useCallback((itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  // Item Click Event
  const handleItemClick = (event, itemId) => {
    if (event.ctrlKey || event.metaKey) {
      toggleItemSelect(itemId);
    } else {
      setSelectedItems([itemId]);
    }
  };

  // Column Update
  const updateColumnItems = useCallback(
    (sourceColId, destColId, sourceIndex, destIndex, draggableId) => {
      return (prev) => {
        // 같은 칼럼 내 이동
        if (sourceColId === destColId) {
          const column = prev[sourceColId];
          const newItems = reorder(column.items, sourceIndex, destIndex);

          return {
            ...prev,
            [sourceColId]: {
              ...column,
              items: newItems,
            },
          };
        } else {
          // 다른 칼럼으로 이동
          const sourceCol = prev[sourceColId];
          const destCol = prev[destColId];
          const [movedItem] = sourceCol.items.splice(sourceIndex, 1);
          const newDestItems = [...destCol.items];
          newDestItems.splice(destIndex, 0, movedItem);

          return {
            ...prev,
            [sourceColId]: {
              ...sourceCol,
              items: sourceCol.items,
            },
            [destColId]: {
              ...destCol,
              items: newDestItems,
            },
          };
        }
      };
    },
    []
  );

  // Drag Update
  const onDragUpdate = useCallback(
    (update) => {
      if (!update.destination) {
        setIsDraggingOver(false);
        return;
      }

      const { draggableId, source, destination } = update;
      const canMove = canMoveItem(
        columns,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      );

      // 원래 위치로 돌아가는 경우를 체크
      const isReturning =
        source.droppableId === destination.droppableId &&
        source.index === destination.index;

      setIsDraggingOver(!canMove);
      setIsDraggingOver(!canMove && !isReturning);

      draggedItemRef.current = { source, destination, canMove };
    },
    [columns]
  );

  // Drag End
  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    setIsDraggingOver(false);
    if (!destination || !draggedItemRef.current) return;

    if (draggedItemRef.current.canMove) {
      setColumns(
        updateColumnItems(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index
        )
      );
    } else if (draggedItemRef.current.canMove === false) {
      setColumns((prev) => ({ ...prev }));
    }
    draggedItemRef.current = null;
  }, []);

  return {
    columns,
    setColumns,
    onDragUpdate,
    onDragEnd,
    isDraggingOver,
    selectedItems,
    toggleItemSelect,
    handleItemClick,
  };
}
