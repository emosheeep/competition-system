import * as qiniu from 'qiniu-js';

const config = {
  region: qiniu.region.z2,
};
/**
 * 表单上传文件
 * @param name 文件名
 * @param{Blob} file 文件内容
 * @param token 鉴权token
 * @returns {object}
 */
export const uploader = function(name, file, token) {
  return qiniu.upload(file, name, token, null, config);
};
