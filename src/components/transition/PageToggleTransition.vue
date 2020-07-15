<template>
  <transition enter-active-class="animate__animated animate__fadeIn">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'PageToggleTransition'
}
</script>
