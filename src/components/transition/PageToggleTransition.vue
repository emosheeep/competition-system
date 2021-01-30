<template>
  <transition :enter-active-class="`animate__animated animate__${name}`">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'PageToggleTransition',
  props: {
    name: String,
  },
};
</script>
