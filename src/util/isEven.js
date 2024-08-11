export const isEven = (itemId) => {
  if (!itemId) return false;

  const itemNumber = parseInt(itemId, 10);
  return itemNumber % 2 === 0;
};

// 짝수 아이템 인접 여부 확인
export const hasAdjacentEvenItems = (items) => {
  for (let i = 0; i < items.length - 1; i++) {
    if (isEven(items[i].id) && isEven(items[i + 1].id)) {
      return true;
    }
  }
  return false;
};
