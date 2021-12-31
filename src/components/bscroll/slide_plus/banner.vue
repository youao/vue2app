<template>
  <Slide v-if="list.length" :index="start" loop @change="onSlideChange">
    <SlideItem v-for="(item, index) in list" :key="index">
      <div class="banner">
          <img :src="item.img" alt="">
      </div>
    </SlideItem>

    <template #pagination>
      <SlidePagination :count="list.length" :current="current" />
    </template>
  </Slide>
</template>

<script>
import Slide from "@/components/bscroll/slide";
import SlideItem from "@/components/bscroll/slide/item";
import SlidePagination from "@/components/bscroll/slide/pagination";

export default {
  name: "Banner",
  components: {
    Slide,
    SlideItem,
    SlidePagination,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    start: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  mounted() {
    this.current = this.start;
  },
  methods: {
    onSlideChange(e) {
      this.current = e;
    },
  },
};
</script>

<style scoped lang="scss">
.banner {
    position: relative;
    img {
        display: block;
        width: 100%;
    }
}
</style>