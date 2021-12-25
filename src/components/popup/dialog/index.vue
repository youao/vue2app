<template>
  <Popup :show="showProp" styles="width:80%" @mask-click="onMaskClick">
    <div class="dialog">
      <div v-if="title" class="title">{{ title }}</div>
      <div class="content" v-html="content"></div>
      <div v-if="inputShow" class="input">
        <input type="text" placeholder="请输入" v-model="value" />
      </div>
      <div class="button">
        <span
          v-for="(item, index) in buttons"
          :key="index"
          class="button-item button-hover"
          :style="item.style"
          @click="onButtonClick(index, item)"
          >{{ item.text }}</span
        >
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "../index";

export default {
  name: "Dialog",
  components: {
    Popup,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
    content: String,
    inputVal: String | Number,
    inputShow: {
      type: Boolean,
      default: false,
    },
    buttons: Array,
  },
  data() {
    return {
      showProp: false,
      value: "",
    };
  },
  watch: {
    show(nVal) {
      this.showProp = nVal;
    },
    inputVal(nVal) {
      this.value = nVal;
    },
  },
  methods: {
    onButtonClick(index) {
      let data = { index };
      if (this.inputShow) {
        data.value = this.value;
      }
      this.$emit("button-click", data);
    },
    onMaskClick() {
      this.$emit("mask-click");
    },
  },
};
</script>

<style scoped lang="scss">
.dialog {
  width: 100%;
  text-align: center;
  background: #fff;
  border-radius: 0.5em;
}
.title {
  padding: 1.5em 1.5em 0;
  font-weight: 400;
}
.content {
  padding: 1.5em;
  word-wrap: break-word;
}
.input {
  padding: 0 1.5em 1.5em;
}
.input input {
  width: 100%;
  text-align: center;
  font-size: 1.2em;
}
.button {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.button-item {
  flex: 1;
  padding: 1em 0;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.button-item:first-of-type {
  border-left: 0;
}
</style>