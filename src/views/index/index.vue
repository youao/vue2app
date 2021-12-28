<template>
  <Page>
    <Slide @change="onSlideChange">
      <SlideItem v-for="(item, index) in nums" :key="index">
        <div class="banner" :style="{ background: item.bg }">{{ index }}</div>
      </SlideItem>

      <template #pagination>
        <SlidePagination :count="nums.length" :current="current" />
      </template>
    </Slide>
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
  },
};
</script>
<style scoped lang="scss">
.banner {
  height: 4rem;
}
</style>