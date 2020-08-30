<template>
  <a-menu
    v-show="visible"
    class="contextmenu"
    :style="style"
    :selected-keys="selectedKeys"
    @click="handleClick"
  >
    <a-menu-item
      v-for="item in list"
      :key="item.key"
      style="margin: 0"
    >
      <component :is="item.icon" />
      <span v-text="item.text" />
    </a-menu-item>
  </a-menu>
</template>

<script>
import { onUnmounted, ref, computed } from 'vue'
import getTabKey from '@/layouts/tab/getTabKey'

export default {
  name: 'ContextMenu',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: ['update:visible', 'select'],
  setup (props, { emit }) {
    let target = null
    const selectedKeys = ref([])
    const left = ref(0)
    const top = ref(0)
    const style = computed(() => {
      return createBaseStyle(left.value, top.value)
    })

    function closeMenu () {
      emit('update:visible', false)
    }
    function setPosition (e) {
      left.value = e.clientX
      top.value = e.clientY
      target = e.target
    }
    function handleClick ({ key }) {
      emit('select', key, target)
      closeMenu()
    }

    // 鼠标右键事件监听和释放
    const clickHandler = () => closeMenu()
    const contextMenuHandler = e => {
      if (getTabKey(e.target)) {
        setPosition(e)
      } else {
        closeMenu()
      }
    }
    window.addEventListener('click', clickHandler)
    window.addEventListener('contextmenu', contextMenuHandler)
    onUnmounted(() => {
      window.removeEventListener('click', clickHandler)
      window.removeEventListener('contextmenu', contextMenuHandler)
    })

    return {
      style,
      selectedKeys,
      handleClick,
    }
  },
}

/**
 * 生成style样式（直接写css不管用气死我了）
 * @param{number} left
 * @param{number} top
 * @returns{object} style
 */
function createBaseStyle (left, top) {
  return {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    zIndex: 1000,
    borderRadius: '4px',
    border: '1px lightgrey solid',
    boxShadow: '4px 4px 10px lightgrey',
  }
}
</script>
