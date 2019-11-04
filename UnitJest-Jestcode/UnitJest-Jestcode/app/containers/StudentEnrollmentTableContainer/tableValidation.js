// Data coming in from server has no disabled indicator, so always false to start.
const boolToCheckboxState = val => {
  if (typeof val === 'boolean') return { checked: val, disabled: false };
  return val;
};

export const init = (data, rules) => mergeRules(convertBools(data), rules);

// Convert checkbox <boolean>data into objects that have `checked` and `disabled` properties
export const convertBools = data => data.map(row => row.map(boolToCheckboxState));

export const mergeRules = (data, rules) => {
  if (typeof rules !== 'object') return [...data];

  const rowHeader =
    data &&
    data[0] &&
    data[0].map(item => {
      const rule = rules.find(r => r.id === item.id);
      return typeof item === 'object'
        ? { ...item, ...rule, checked: false, totalDisabled: 0, totalChecked: 0 }
        : item;
    });

  // Return copy of data with new header
  return [rowHeader, ...data.slice(1)];
};

export function getItemsInColumn(rows, columnIndex) {
  return rows.map((row, rowIndex) => rows[rowIndex][columnIndex]);
}

export function isAnyDisabled(items) {
  return items.some(item => item.disabled === true);
}

export function isAllChecked(items) {
  return items.every(item => item.checked === true);
}

export const validateHeaderRow = rows => {
  const headerRow = rows[0];
  const talliedHeaderRow = headerRow.map((headerItem, columnIndex) => {
    if (typeof headerItem === 'string') {
      return headerItem;
    }

    // Slice off the first item which is the header item
    const itemsColumn = getItemsInColumn(rows, columnIndex).slice(1);
    const anyDisabled = isAnyDisabled(itemsColumn);
    const allChecked = isAllChecked(itemsColumn);

    return { ...headerItem, anyDisabled, allChecked };
  });

  const updatedRows = [talliedHeaderRow, ...rows.slice(1)];
  return updatedRows;
};

// Updates `disabled` property of each item in row based on rules
export const validateRow = (data, rowIndex) => {
  const rules = data[0];
  const itemsToDisable = data[rowIndex].reduce((siblings, item, columnIndex) => {
    const appendSiblings =
      typeof item === 'object' && item.checked === true ? rules[columnIndex].siblings : [];
    return siblings.concat(appendSiblings);
  }, []);

  const validatedRow = data[rowIndex].map((item, columnIndex) => {
    const disabled = itemsToDisable.includes(rules[columnIndex] && rules[columnIndex].id);
    return typeof item === 'object' ? { ...item, disabled } : item;
  });

  return validatedRow;
};

export const validateAll = (data = [], rules) => {
  const initializedData = init(data, rules);
  const validatedRowData = initializedData.map((_, index) => validateRow(initializedData, index));
  const validatedAllData = validateHeaderRow(validatedRowData);
  return validatedAllData;
};

export const updateItem = (
  item,
  index,
  activeColumnIndex,
  siblingIndexesToActiveColumn,
  newItemValue
) => {
  // Potentially a string, do nothing.
  if (typeof item !== 'object') return item;
  // Items not clicked
  if (index !== activeColumnIndex) {
    const isSibling = siblingIndexesToActiveColumn.includes(index);
    // If it is a sibling, uncheck it. Disabling handled separately.
    if (isSibling) {
      return { ...item, checked: false };
    }
    // If the item is not related to the clicked item, return same item.
    return { ...item };
  }
  // Toggle the clicked on item
  return { ...item, checked: newItemValue };
};

export const rowWithToggledItem = (row, activeColumnIndex, siblingIndexesToActiveColumn) =>
  row.map((item, index) =>
    updateItem(item, index, activeColumnIndex, siblingIndexesToActiveColumn, !item.checked)
  );

export const getSiblingIndexes = (rowHeader, activeColumnIndex) => {
  const siblingsToActiveColumn =
    (rowHeader[activeColumnIndex] && rowHeader[activeColumnIndex].siblings) || [];
  return siblingsToActiveColumn.map(siblingId => rowHeader.findIndex(r => r.id === siblingId));
};

export const toggleAll = (data, activeColumnIndex, value = false) => {
  const rowHeader = data[0];
  const rows = data.slice(1);
  const updatedRows = rows.map(row => {
    const siblingIndexesToActiveColumn = getSiblingIndexes(rowHeader, activeColumnIndex);
    const updatedRow = row.map((item, index) =>
      updateItem(item, index, activeColumnIndex, siblingIndexesToActiveColumn, value)
    );
    return updatedRow;
  });
  return [rowHeader, ...updatedRows];
};

export const toggle = (data, rowIndex, activeColumnIndex) => {
  const rowHeader = data[0];
  const row = data[rowIndex];
  const siblingIndexesToActiveColumn = getSiblingIndexes(rowHeader, activeColumnIndex);

  const updatedData = [...data];
  updatedData[rowIndex] = rowWithToggledItem(row, activeColumnIndex, siblingIndexesToActiveColumn);

  const rowValidated = validateRow(updatedData, rowIndex);
  updatedData[rowIndex] = rowValidated;

  return updatedData;
};
