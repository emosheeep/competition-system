import { isFunction, has } from 'lodash-es';

export const emptySet = new Set([null, undefined, '']);

export const getValue = function(def, params = {}) {
  return isFunction(def)
    ? def(params)
    : def;
};

export function getDefaultValue(option, params = {}) {
  const data = {};

  if (has(option, 'key') && has(option, 'default')) {
    data[option.key] = getValue(option.default, params);
  }

  const { label } = option;
  if (has(label, 'key') && has(label, 'default')) {
    data[label.key] = getValue(label.default, params);
  }

  return data;
}

export function getInjectedEvents(on = {}, ...params) {
  const events = {};
  for (const key of Object.keys(on)) {
    const handler = on[key];
    if (isFunction(handler)) {
      // 注入参数
      events[key] = handler.bind(Object.create(null), ...params);
    } else {
      console.error(`Invalid event handler! '${key}' must be a function`);
    }
  }
  return events;
}

export const notEmpty = data => !emptySet.has(data);

export function getFilterData(obj, condition = notEmpty) {
  const result = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (condition(value, key)) {
      result[key] = value;
    }
  }
  return result;
}
