/**
 * 获取Tab标签下dom节点中自定义的数据，递归向下查找最多3层（观察Tab组件渲染后的DOM得出）
 * 该方式属于hack手段，不得已为之
 * @param{HTMLElement} target event.target
 * @param depth 深度
 */
export default function getTabKey (target, depth = 0) {
  if (depth > 2 || !target) {
    return null
  }
  return target.dataset.key || getTabKey(target.firstElementChild, ++depth)
}
