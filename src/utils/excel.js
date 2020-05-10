import XLSX from 'xlsx'

/**
 * 下载表格数据
 * @param {Object} sheets 数据对象
 */
export function makeExcel (sheets) {
  const workbook = XLSX.utils.book_new()
  for (const name in sheets) {
    const worksheet = XLSX.utils.json_to_sheet(sheets[name])
    XLSX.utils.book_append_sheet(workbook, worksheet, name)
  }
  XLSX.writeFile(workbook, 'data.xlsx')
}

/**
 * 读取excel文件，转换为json数据
 * @param data
 * @returns {Object[]}
 */
export function readExcel (data) {
  const workbook = XLSX.read(data, { type: 'binary' })
  const { SheetNames } = workbook
  const sheet = workbook.Sheets[SheetNames[0]] // 只读取第一张表
  return XLSX.utils.sheet_to_json(sheet)
}
