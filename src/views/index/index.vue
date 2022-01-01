<template>
  <Page ref="page" custom refresh @refresh="onRefresh" @reach-bottom="onReachBottom">
    <Banner :list="banner"></Banner>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import Banner from "@/components/bscroll/slide_plus/banner";

export default {
  components: {
    Banner,
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
  mounted() {},
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