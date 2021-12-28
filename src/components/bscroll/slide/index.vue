<template>
  <div ref="wrap" style="position: relative">
    <div
      ref="content"
      :style="{
        width: itemW ? itemW + 'px' : '',
        transform: 'translateX(' + spaceW + 'px)',
      }"
    >
      <div><slot /></div>
    </div>
    <slot name="pagination"></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "ScrollSlide",
  props: {
    autoplay: {
      type: Boolean | Object,
      default() {
        return {
          delay: 3000,
        };
      },
    },
    loop: {
      type: Boolean,
      default: false,
    },
    space: {
      type: Number,
      default: 1,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slide: null,
      itemW: 0,
      spaceW: 0,
      current: 0,
    };
  },
  mounted() {
    const interval =
      this.autoplay && this.autoplay.delay ? this.autoplay.delay : 3000;
      
    const options = {
      scrollX: !this.vertical,
      scrollY: this.vertical,
      slide: {
        loop: this.loop,
        autoplay: !!this.autoplay,
        interval
      },
      momentum: false,
      bounce: false,
      probeType: 3,
    };

    this.slide = new BScroll(this.$refs.content, options);

    const wrapW = this.$refs.wrap.offsetWidth;
    this.itemW = wrapW / this.space;
    this.spaceW = (wrapW - this.itemW) / 2;

    this.$nextTick(() => {
      this.slide.refresh();
    });

    this.slide.on("slideWillChange", (page) => {
      this.current = page.pageX;
      this.$emit("change", page.pageX);
    });
  },
  methods: {},
};
</script>
