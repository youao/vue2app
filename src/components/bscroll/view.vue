<template>
  <div ref="view" class="view">
    <slot />
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "ScrollView",
  props: {
    scrollX: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.view, {
      scrollY: this.scrollY,
      scrollX: this.scrollX,
      observeDOM: true,
      click: true
    });
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.view {
  position: relative;
  overflow: hidden;
}
</style>