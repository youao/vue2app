<template>
  <Page custom @reach-bottom="onReachBottom">
    <Slide loop @change="onSlideChange">
      <SlideItem v-for="(item, index) in nums" :key="index">
        <div class="banner" :style="{ background: item.bg }">{{ index }}</div>
      </SlideItem>

      <template #pagination>
        <SlidePagination :count="nums.length" :current="current" />
      </template>
    </Slide>

    <div
      v-for="(item, index) in 10"
      :key="index"
      style="height: 4rem; background: #eee; margin: 0.2rem"
    ></div>

    <div style="height: 1px"></div>
  </Page>
</template>

<script>
import Slide from "@/components/bscroll/slide";
import SlideItem from "@/components/bscroll/slide/item";
import SlidePagination from "@/components/bscroll/slide/pagination";

export default {
  components: {
    Slide,
    SlideItem,
    SlidePagination,
  },
  data() {
    return {
      nums: [
        {
          bg: "#eee",
        },
        {
          bg: "#ddd",
        },
        {
          bg: "#ccc",
        },
        {
          bg: "#bbb",
        },
        {
          bg: "#aaa",
        },
        {
          bg: "#999",
        },
      ],
      current: 0,
    };
  },
  mounted() {},
  methods: {
    onSlideChange(e) {
      this.current = e;
    },
    onReachBottom() {
      console.log("asa");
    },
  },
};
</script>
<style scoped lang="scss">
.banner {
  height: 4rem;
}
</style>