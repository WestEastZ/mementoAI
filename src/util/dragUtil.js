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
  draggableId
) => {
  // 1번 칼럼에서 3번 칼럼으로 이동 불가
  if (sourceColId === "col1" && destinationColId === "col3") {
    return false;
  }

  // 원본 칼럼의 아이템
  const sourceItems = [...columns[sourceColId].items];

  // 목적지 칼럼의 아이템
  const destItems = [...columns[destinationColId].items];

  // 이동 아이템
  const movedItem = sourceItems.find((item) => item.id === draggableId);

  if (!movedItem) {
    return false;
  }

  // 짝수 아이템 인접 여부 확인
  const hasAdjacentEvenItems = (items) => {
    for (let i = 0; i < items.length - 1; i++) {
      if (isEven(items[i].id) && isEven(items[i + 1].id)) {
        return true;
      }
    }
    return false;
  };

  // 이동 후 상태
  const newSourceItems = sourceItems.filter((item) => item.id !== draggableId);

  let newDestItems;
  if (sourceColId === destinationColId) {
    // 같은 칼럼 내 이동
    newDestItems = newSourceItems;
    newDestItems.splice(destinationIndex, 0, movedItem);
  } else {
    // 다른 칼럼으로 이동
    newDestItems = [...destItems];
    newDestItems.splice(destinationIndex, 0, movedItem);
  }

  // 원본 칼럼 검사 (같은 칼럼 내 이동 시 변경 후 칼럼만 검사)
  const sourceHasAdjacentEven =
    sourceColId !== destinationColId
      ? hasAdjacentEvenItems(newSourceItems)
      : false;

  // 목적지 칼럼 검사
  const destHasAdjacentEven = hasAdjacentEvenItems(newDestItems);

  return !(sourceHasAdjacentEven || destHasAdjacentEven);
};
