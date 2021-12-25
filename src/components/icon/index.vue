<template>
  <svg v-if="svg" class="icon-svg" aria-hidden="true">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
  <i v-else class="iconfont" :class="'icon-' + name"></i>
</template>

<script>
export default {
  name: "Icon",
  props: {
    svg: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@import "./iconfont.css";

.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.iconfont {
  display: inline-block;
  font-size: 1em;
}
</style>