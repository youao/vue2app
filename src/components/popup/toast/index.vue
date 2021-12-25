<template>
  <Popup :show="showPop" :mask="false" styles="width:75%">
    <div class="toast" :class="{ iconbox: !!icon }">
      <template v-if="icon">
        <Loading v-if="icon == 'loading'" class="icon" />
        <Icon v-else-if="icon == 'success'" name="success-a" class="icon" />
        <Icon v-else-if="icon == 'error'" name="warning-f" class="icon" />
        <img v-else :src="icon" class="icon-img" />
      </template>
      <div class="title">{{ title }}</div>
    </div>
  </Popup>
</template>

<script>
import Popup from "../index";
import Loading from "@/components/loading";
import Icon from "@/components/icon";

export default {
  name: "Toast",
  components: {
    Popup,
    Loading,
    Icon,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
    icon: String,
  },
  data() {
    return {
      showPop: false,
      timer: null,
    };
  },
  watch: {
    show(nVal) {
      this.showPop = nVal;
    },
  },
};
</script>

<style scoped>
.toast {
  width: auto;
  max-width: 100%;
  padding: 0.5em;
  text-align: center;
  white-space: nowrap;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 0.5em;
}
.toast.iconbox {
  width: 6.5em;
  padding: 1em 0.5em;
}
.icon-img {
  display: block;
  width: 2em;
  height: 2em;
  margin: 0.5em auto;
}
.icon {
  font-size: 2em;
  margin: 0.5em auto;
}
.title {
  font-size: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>