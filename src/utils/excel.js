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
  XLSX.writeFile(workbook, name.endsWith('.xlsx') ? name : `${name}.xlsx`);
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

/**
 * 基于makeExcel封装将表格数据导出的函数
 */
export function exportData(config) {
  const { data, header, name, keyMap } = config;
  return makeExcel({
    name,
    header,
    data: data.map(v => {
      const result = {};
      for (const [key, value] of Object.entries(v)) {
        let name = keyMap[key];
        let convert = value => value;
        if (Array.isArray(name)) {
          [name, convert] = name;
        }
        if (name) {
          result[name] = convert(value);
        }
      }
      return result;
    }),
  });
}
