// // 带过期时间的持久化加密本地存储
// import { Base64 } from 'js-base64'
// import moment from 'moment'
//
// class Storage {
//   constructor () { // 参数为最长过期时间
//     this.storage = window.localStorage
//   }
//   setItem (key, value) {
//     // 这里的value已经是JSON格式
//     this.storage.setItem(key, Base64.encode(value))
//   }
//   getItem (key) {
//     const origin = Base64.decode(this.storage.getItem(key))
//     let { expires } = JSON.parse(origin)
//     expires = moment(expires)
//     console.log('到期时间：', expires.format('YYYY-MM-DD HH:mm:ss'))
//     if (moment().isSameOrBefore(expires)) {
//       return origin // 这里要返回JSON格式字符串
//     } else {
//       // 时间过期就清空
//       this.removeItem(key)
//       return ''
//     }
//   }
//   removeItem (key) {
//     this.storage.removeItem(key)
//   }
// }
//
// export default Storage
