<template>
  <Popup :show="showPop" position="bottom" @mask-click="close">
    <div class="actionsheet">
      <div class="title">{{ title }}</div>
      <div class="menus">
        <div
          v-for="(item, index) in menus"
          :key="index"
          class="menu"
          v-html="item"
          @click="onMenuClick(index, item)"
        ></div>
      </div>
      <div v-if="showCancel" class="button" @click="close">取消</div>
    </div>
  </Popup>
</template>

<script>
import Popup from "../index";

export default {
  name: "Actionsheet",
  components: {
    Popup,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "请选择",
    },
    menus: {
      type: Array,
      default() {
        return [];
      },
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPop: false,
    };
  },
  watch: {
    show(nVal) {
      this.showPop = nVal;
    },
  },
  methods: {
    onMenuClick(index, item) {
      let data = { index, item };
      this.$emit("menu-click", data);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.actionsheet {
  width: 100%;
  border-radius: 0.8em 0.8em 0 0;
  background: #fff;
}
.title {
  font-size: 0.8em;
  text-align: center;
  padding: 1em;
}
.title,
.menu {
  word-break: break-all;
}
.menus {
  padding-bottom: 0.5em;
  background: $gray-f;
}
.menu,
.button {
  padding: 1em;
  text-align: center;
  background: #fff;
  border-top: 1px solid $gray-f2;
}
.button {
  color: $gray-9;
}
</style>