import { isEven } from "./isEven";

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const canMoveItem = (
  columns,
  sourceColId,
  destinationColId,
  sourceIndex,
  destinationIndex,
  draggableId,
  selectedItems
) => {
  // 1번 칼럼에서 3번 칼럼 이동 불가
  if (sourceColId === "col1" && destinationColId === "col3") {
    return false;
  }

  // 원본 칼럼
  const sourceItems = [...columns[sourceColId].items];

  // 목적지 칼럼
  const destItems =
    sourceColId === destinationColId
      ? sourceItems
      : [...columns[destinationColId].items];

  // 이동 아이템
  const itemsToMove = selectedItems.includes(draggableId)
    ? selectedItems
    : [draggableId];

  const moveIndices = itemsToMove
    .map((id) => sourceItems.findIndex((item) => item.id === id))
    .sort((a, b) => a - b);

  const newSourceItems = sourceItems.filter(
    (_, index) => !moveIndices.includes(index)
  );
  const movedItems = moveIndices.map((index) => sourceItems[index]);
  const newDestItems = [...destItems];
  newDestItems.splice(destinationIndex, 0, ...movedItems);

  // 짝수 아이템 인접 여부 확인
  const hasAdjacentEvenItems = (items) => {
    for (let i = 0; i < items.length - 1; i++) {
      if (isEven(items[i].id) && isEven(items[i + 1].id)) {
        return true;
      }
    }
    return false;
  };

  const sourceHasAdjacentEven =
    sourceColId !== destinationColId
      ? hasAdjacentEvenItems(newSourceItems)
      : false;
  const destHasAdjacentEven = hasAdjacentEvenItems(newDestItems);

  return !(sourceHasAdjacentEven || destHasAdjacentEven);
};
