<template>
  <div v-show="show">
    <div class="footer">
      <div
        v-for="(item, index) in navs"
        :key="index"
        class="footer-item"
        :class="{ active: $route.path == item.path }"
        @click="$router.push(item.path)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="safe-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      navs: [
        {
          text: "首页",
          path: "/",
        },
        {
          text: "我的",
          path: "/user",
        },
      ],
    };
  },
  computed: {
    show() {
      for (let i = 0; i < this.navs.length; i++) {
        let item = this.navs[i];
        if (this.$route.path == item.path) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    tapNav() {},
  },
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  border-top: 1px solid $gray-e;

  .footer-item {
    height: 1rem;
    @extend .flex-con;
    @extend .fmix-center;
    color: $gray-9;

    &.active {
      color: $gray-3;
    }
  }
}
</style>