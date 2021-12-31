<template>
  <Page custom @reach-bottom="onReachBottom">
    <Banner :list="banner"></Banner>
  </Page>
</template>

<script>
import Banner from "@/components/bscroll/slide_plus/banner";

export default {
  components: {
    Banner,
  },
  data() {
    return {
      banner: [],
    };
  },
  mounted() {
    this.$get("api/set", "", {
      cache: 300,
    }).then((res) => {
      console.log(res);
      this.banner = res.appinfo.slides;
    });
  },
  methods: {

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