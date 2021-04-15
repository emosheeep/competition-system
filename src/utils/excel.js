export async function getXlsx() {
  const v = await import(/* webpackChunkName: "xlsx" */ 'xlsx');
  return v.default;
}

/**
 * 下载表格数据
 * @param {Object} config
 */
export async function makeExcel(config = {}) {
  const XLSX = await getXlsx();
  const {
    name = 'data.xlsx',
    data = [],
    header = [],
  } = config;

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data, { header });
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, name);
}

/**
 * 读取excel文件，转换为json数据
 * @param data
 * @returns {Object[]}
 */
export async function readExcel(data) {
  const XLSX = await getXlsx();
  const workbook = XLSX.read(data, { type: 'binary' });
  const { SheetNames } = workbook;
  const sheet = workbook.Sheets[SheetNames[0]]; // 只读取第一张表
  return XLSX.utils.sheet_to_json(sheet);
}
