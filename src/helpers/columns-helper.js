export const filterSlots = {
  filterDropdown: 'filterDropdown',
  filterIcon: 'filterIcon',
};

export const filter = key => {
  return (value, record) => {
    return record[key]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase());
  };
};
