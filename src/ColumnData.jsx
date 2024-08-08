export const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `${k + 1}`,
    content: `item ${k + 1}`,
  }));

export const ColumnData = {
  col1: {
    name: "col1",
    items: getItems(10),
  },
  col2: {
    name: "col2",
    items: [],
  },
  col3: {
    name: "col3",
    items: [],
  },
  col4: {
    name: "col4",
    items: [],
  },
};
