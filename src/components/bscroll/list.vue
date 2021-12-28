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
    <Icon
      name="top"
      class="fix-con button-hover"
      :class="{ show: toTopShow }"
      @click.native="scrollToTop(1000)"
    />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Icon from "@/components/icon";
const dpr = window.devicePixelRatio;

export default {
  name: "ScrollList",
  components: {
    Icon,
  },
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
    toTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      canRefresh: false,
      refreshing: false,
      refreshed: false,
      toTopShow: false,
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

    this.scroll.on("scroll", this.scrollHandler);

    if (this.pulldown) {
      this.scroll.on("pullingDown", this.pullingDownHandler);
    }
  },
  methods: {
    scrollHandler(res) {
      if (this.pulldown) {
        this.canRefresh = res.y >= this.threshold;
      }

      const el = this.$refs.wrap;
      if (this.pullUp) {
        if (el.offsetHeight - res.y + this.pullUpThreshold >= el.scrollHeight) {
          this.$emit("reach-bottom");
        }
      }

      if (this.toTop) {
        this.toTopShow = -res.y > el.offsetHeight;
      }
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
    scrollToTop(time) {
      this.scroll.scrollTo(0, 0, time);
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
.fix-con {
  width: 0.8rem;
  height: 0.8rem;
  @extend .fmix-center;
  position: absolute;
  bottom: -1rem;
  right: 0.1rem;
  font-size: 0.4rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0.02rem 0.01rem rgba($color: #000000, $alpha: 0.1);
  overflow: hidden;
  opacity: 0;
  transition: bottom 0.3s, opacity 0.3s;

  &.show {
    bottom: 1rem;
    opacity: 1;
  }
}
</style>