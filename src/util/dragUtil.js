import { hasAdjacentEvenItems, isEven } from "./isEven";

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

  // 이동 아이템 추출
  const movedItems = sourceItems.filter((item) =>
    itemsToMove.includes(item.id)
  );

  let newDestItems;
  if (sourceColId === destinationColId) {
    // 같은 칼럼 내 이동
    newDestItems = sourceItems.filter((item) => !itemsToMove.includes(item.id));
    newDestItems.splice(destinationIndex, 0, ...movedItems);
  } else {
    // 다른 칼럼으로 이동
    newDestItems = [...destItems];
    newDestItems.splice(destinationIndex, 0, ...movedItems);
  }

  // 새로운 원본 아이템 배열 생성 (다른 칼럼으로 이동하는 경우에만)
  const newSourceItems =
    sourceColId !== destinationColId
      ? sourceItems.filter((item) => !itemsToMove.includes(item.id))
      : sourceItems;

  const sourceHasAdjacentEven =
    sourceColId !== destinationColId
      ? hasAdjacentEvenItems(newSourceItems)
      : false;
  const destHasAdjacentEven = hasAdjacentEvenItems(newDestItems);

  return !(sourceHasAdjacentEven || destHasAdjacentEven);
};
