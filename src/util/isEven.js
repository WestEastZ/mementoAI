export const isEven = (itemId) => {
  if (!itemId) return false;

  const itemNumber = parseInt(itemId, 10);
  return itemNumber % 2 === 0;
};
