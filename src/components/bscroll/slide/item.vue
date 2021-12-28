<template>
  <div
    class="item"
    :style="{
      padding: between ? '0 ' + between : '',
    }"
  >
    <div
      class="item-content"
      :class="cls"
      :style="'transform: scale(' + scale + ', ' + scale + ');' + sty"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollSlideItem",
  props: {
    between: {
      type: String,
      default: "",
    },
    scale: {
      type: Number,
      default: 1,
    },
    sty: String,
    cls: String,
  },
};
</script>

<style scoped lang="scss">
.item {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}
.item-content {
  transition: transform 0.3s;
}
</style>