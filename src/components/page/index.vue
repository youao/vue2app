<template>
  <div class="page fmix-v">
    <Header
      v-if="!custom"
      :title="pageTitle"
      :rightIcon="rightIcon"
      @tap-left="onTapLeft"
      @tap-right="onTapRight"
    />
    <ScrollList
      ref="scroll"
      class="flex-con"
      toTop
      :pulldown="refresh"
      :bounce="bounce"
      :pullUpThreshold="threshold"
      @reach-bottom="$emit('reach-bottom')"
      @refresh="$emit('refresh')"
    >
      <slot />
    </ScrollList>
  </div>
</template>

<script>
import Header from "@/components/header";
import ScrollList from "@/components/bscroll/list";

export default {
  name: "Page",
  components: {
    Header,
    ScrollList,
  },
  props: {
    custom: {
      type: Boolean,
      default: false,
    },
    title: String,
    onLeft: {
      type: Boolean,
      default: false,
    },
    rightIcon: {
      type: Array | String,
      default() {
        return "";
      },
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    bounce: {
      type: Boolean,
      default: false,
    },
    threshold: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pageTitle() {
      if (typeof this.title != "undefined") return this.title;
      return this.$route.meta.title || "";
    },
  },
  mounted() {},
  methods: {
    onTapLeft() {
      if (this.onLeft) {
        this.$emit("tap-left");
      } else {
        this.$router.back();
      }
    },
    onTapRight(e) {
      this.$emit("tap-right", e);
    },
    finishRefresh() {
      this.$refs.scroll.finishRefresh();
    },
    startPullUp() {
      this.$refs.scroll.startPullUp();
    },
    finishPullUp() {
      this.$refs.scroll.finishPullUp();
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 0;
  background: #fff;
}
</style>