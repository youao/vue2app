<template>
  <div ref="wrap" class="wrap">
    <div>
      <div v-if="pulldown" class="pulldown">
        <div v-show="step == 0">{{ pulldownText }}</div>
        <div v-show="step == 1">{{ releaseText }}</div>
        <div v-show="step == 2">{{ refreshingText }}</div>
        <div v-show="step == 3">{{ refreshedText }}</div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
const dpr = window.devicePixelRatio;

export default {
  name: "ScrollList",
  props: {
    pulldown: {
      type: Boolean,
      default: false,
    },
    threshold: {
      type: Number,
      default() {
        return 100 * dpr;
      },
    },
    stop: {
      type: Number,
      default() {
        return 60 * dpr;
      },
    },
    pulldownText: {
      type: String,
      default: "下拉刷新",
    },
    releaseText: {
      type: String,
      default: "释放刷新",
    },
    refreshingText: {
      type: String,
      default: "加载中...",
    },
    refreshedText: {
      type: String,
      default: "更新完成",
    },
    pullUp: {
      type: Boolean,
      default: true,
    },
    pullUpThreshold: {
      type: Number,
      default: 0,
    },
    // 当滚动超过边缘的时候会有一小段回弹动画
    bounce: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
      canRefresh: false,
      refreshing: false,
      refreshed: false,
    };
  },
  computed: {
    step() {
      if (this.refreshed) return 3;
      if (this.refreshing) return 2;
      if (this.canRefresh) return 1;
      return 0;
    },
  },
  mounted() {
    const pullDownRefresh = this.pulldown
      ? {
          threshold: this.threshold,
          stop: this.stop,
        }
      : false;

    const pullUpLoad = this.pullUp
      ? {
          threshold: this.pullUpThreshold,
        }
      : false;

    this.scroll = new BScroll(this.$refs.wrap, {
      scrollY: true,
      observeDOM: true,
      pullDownRefresh,
      pullUpLoad,
      bounce: this.bounce,
      click: true,
    });

    if (this.pulldown) {
      this.scroll.on("scroll", this.scrollHandler);
      this.scroll.on("pullingDown", this.pullingDownHandler);
    }

    if (this.pullUp) {
      this.scroll.on("pullingUp", () => {
        this.$emit("reach-bottom");
      });
    }
  },
  methods: {
    scrollHandler(res) {
      this.canRefresh = res.y >= this.threshold;
    },
    pullingDownHandler() {
      this.refreshing = true;
      this.$emit("refresh");
    },
    finishRefresh() {
      this.refreshed = true;
      this.refreshing = false;
      setTimeout(() => {
        this.scroll.finishPullDown();
        setTimeout(() => {
          this.refreshed = false;
        }, 1000);
      }, 300);
    },
    startPullUp() {
      this.scroll.openPullUp();
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  position: relative;
  overflow: hidden;
}
.pulldown {
  width: 100%;
  position: absolute;
  padding: 0.1rem 0;
  text-align: center;
  transform: translateY(-100%);
}
</style>