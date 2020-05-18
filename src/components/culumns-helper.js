export const filterSlots = {
  filterDropdown: 'filterDropdown',
  filterIcon: 'filterIcon',
  customRender: 'filter'
}
export const changeVisible = visible => {
  if (visible) {
    setTimeout(() => {
      this.$refs.searchInput.focus()
    }, 0)
  }
}
export const filter = key => {
  return (value, record) => {
    return record[key]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase())
  }
}
