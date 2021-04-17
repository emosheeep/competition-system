export const grades = [
  { label: '大一', value: 1 },
  { label: '大二', value: 2 },
  { label: '大三', value: 3 },
  { label: '大四', value: 4 },
];
export const gradeMap = map(grades);

export const ranks = [
  { label: '其他', value: 0 },
  { label: '教授', value: 1 },
  { label: '副教授', value: 2 },
  { label: '讲师', value: 3 },
];
export const rankMap = map(ranks);

export const sexes = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
];
export const sexMap = map(sexes);

export const raceLevels = [
  { label: '校级', value: 1 },
  { label: '省级', value: 2 },
  { label: '国家级一般', value: 3 },
  { label: '国家级重点', value: 4 },
];
export const raceLevelMap = map(raceLevels);

function map(arr) {
  const result = {};
  for (const { label, value } of arr) {
    result[value] = label;
  }
  return result;
}

export const permissionTypes = [
  'user',
  'race',
  'record',
  'role',
  'permission',
].map(key => ({
  label: key,
  value: key,
}));

export const actions = [
  'add',
  'delete',
  'update',
  'query',
  'import',
  'export',
].map(key => ({
  label: key,
  value: key,
}));
