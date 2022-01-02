<template>
  <Page ref="page" custom refresh @refresh="onRefresh" @reach-bottom="onReachBottom">
    <Banner :list="banner"></Banner>
    <Button to="/taobao/list">淘宝列表</Button>
    <Button to="/jd/list">京东列表</Button>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import Banner from "@/components/bscroll/slide_plus/banner";
import Button from "@/components/button";

export default {
  components: {
    Banner,
    Button
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      banner(state) {
        if (!state.app.appInfo) return [];
        return state.app.appInfo.slides;
      },
    }),
  },
  mounted() {
  },
  methods: {
    onRefresh() {
      this.$store.dispatch("APPINFO", 1).finally(() => {
        this.$refs.page.finishRefresh();
      });
    },
    onReachBottom() {
      console.log("asa");
    },
  },
};
</script>
<style scoped lang="scss">
</style>