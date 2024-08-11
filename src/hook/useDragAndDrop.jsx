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
    (sourceColId, destColId, destIndex, draggableId) => {
      return (prev) => {
        const itemsToMove = selectedItems.includes(draggableId)
          ? selectedItems
          : [draggableId];

        const sourceCol = prev[sourceColId];
        const destCol = sourceColId === destColId ? sourceCol : prev[destColId];

        // 원본 칼럼에서 선택된 아이템 제거
        const newSourceItems = sourceCol.items.filter(
          (item) => !itemsToMove.includes(item.id)
        );

        // 선택된 아이템
        const movedItems = sourceCol.items.filter((item) =>
          itemsToMove.includes(item.id)
        );

        let newDestItems;
        if (sourceColId === destColId) {
          // 같은 칼럼 내 이동
          newDestItems = [...newSourceItems];
          newDestItems.splice(destIndex, 0, ...movedItems);
        } else {
          // 다른 칼럼으로 이동
          newDestItems = [...destCol.items];
          newDestItems.splice(destIndex, 0, ...movedItems);
        }

        return {
          ...prev,
          [sourceColId]: {
            ...sourceCol,
            items: newSourceItems,
          },
          [destColId]: {
            ...destCol,
            items: newDestItems,
          },
        };
      };
    },
    [selectedItems]
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
        draggableId,
        selectedItems
      );

      // 원래 위치로 돌아가는 경우를 체크
      const isReturning =
        source.droppableId === destination.droppableId &&
        source.index === destination.index;

      // 아이템이 이동할 수 없고 원래 위치로 이동하고 있지 않는 경우
      setIsDraggingOver(!canMove && !isReturning);

      draggedItemRef.current = { source, destination, canMove };
    },
    [columns, selectedItems]
  );

  // Drag End
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      setIsDraggingOver(false);
      if (!destination || !draggedItemRef.current) return;

      if (draggedItemRef.current.canMove) {
        setColumns(
          updateColumnItems(
            source.droppableId,
            destination.droppableId,

            destination.index,
            draggableId
          )
        );
      } else if (draggedItemRef.current.canMove === false) {
        setColumns((prev) => ({ ...prev }));
      }
      draggedItemRef.current = null;
      setSelectedItems([]);
    },
    [columns, selectedItems, updateColumnItems]
  );

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
