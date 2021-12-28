<template>
  <div
    v-if="type == 'num'"
    class="wrap"
    :style="{ 'font-size': size, 'text-align': align }"
  >
    <span class="num-content">{{ current + 1 }} / {{ count }}</span>
  </div>
  <div v-else class="wrap" :style="{ 'font-size': size, 'text-align': align }">
    <span
      v-for="(item, index) in count"
      :key="index"
      class="dot"
      :class="{ active: current === index }"
      :style="{
        'background-color': current === index ? dotCurrentColor : dotColor,
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "ScrollSlidePagination",
  props: {
    align: {
      type: String,
      default: "center",
    },
    count: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "dot",
    },
    size: {
      type: String,
      default: "1em",
    },
    dotColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.5)",
    },
    dotCurrentColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.5)",
    },
  },
};
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1em;
  box-sizing: border-box;

  .dot {
    display: inline-block;
    margin: 0 0.2em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.5em;
    transition: width 0.3s;

    &.active {
      width: 1.2em;
    }
  }

  .num-content {
    display: inline-block;
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    padding: 0 0.5em;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 0.5em;
  }
}
</style>