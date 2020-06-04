import store from '../store'
import axios from './axios'
import { REFRESH_TOKEN } from '../store/mutation-types'

let lock = false
const originRequest = []

function reset () {
  lock = false
  originRequest.splice(0)
}

/**
 * 处理401——刷新token并处理之前的请求，目的在于实现用户无感知刷新
 * @param config 之前的请求的配置
 * @returns {Promise<unknown>}
 */
export default function (config) {
  if (!lock) {
    lock = true
    store.dispatch(REFRESH_TOKEN).then(newToken => {
      const requests = originRequest.map(callback => callback(newToken))
      return axios.all(requests)
    }).finally(reset)
  }
  return new Promise(resolve => {
    originRequest.push(newToken => {
      config.headers.authorization = newToken
      resolve(axios(config))
    })
  })
}
