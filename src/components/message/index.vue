<template>
  <div class="message">
    <div class="wrap-box">
      <div class="wrap">
        <Icon
          v-if="icon"
          :name="icon"
          :svg="iconType == 'svg'"
          :class="['icon', iconCls]"
        />
        <div v-if="title" class="title">{{ title }}</div>
        <div v-if="content" class="content" v-html="content"></div>
        <slot />
      </div>
    </div>
    <div class="footer">
      <slot name="foot-top" />
      <div class="buttons">
        <Button
          v-for="(item, index) in buttons"
          :key="index"
          class="button"
          block
          :circle="item.circle"
          :type="item.type"
          :color="item.color"
          :style="item.style"
          @tap="$emit('button-click', { index, item })"
          >{{ item.text }}</Button
        >
      </div>
      <slot name="foot-bottom" />
    </div>
  </div>
</template>

<script>
import Button from "../button";
import Icon from "../icon";

export default {
  name: "Message",
  components: {
    Button,
    Icon,
  },
  props: {
    icon: String,
    iconCls: {
      type: String,
      default: "info",
    },
    iconType: String,
    title: String,
    content: String,
    buttons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding-top: 3em;
  text-align: center;
  overflow: hidden;
  background-color: #fff;
}
.wrap-box {
  flex: 1;
  position: relative;
  padding: 0 2em;
  overflow: hidden;
}
.wrap-box::after {
  content: "";
  display: block;
  width: 100%;
  height: 2em;
  position: absolute;
  bottom: 0;
  left: 0;
  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
}
.wrap::after {
  content: "";
  display: block;
  height: 2em;
}
.wrap {
  height: 100%;
  overflow-y: scroll;
}
.icon {
  font-size: 3em;

  &.success {
    color: $green;
  }
  &.warning {
    color: $orange;
  }
  &.danger {
    color: $red;
  }
  &.primary {
    color: $blue;
  }
  &.info {
    color: $gray-9;
  }
}
.title {
  font-size: 1.375em;
  margin: 1em 0;
}
.content {
  margin-bottom: 1em;
}
.footer {
  padding: 0 2em 1em;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.button {
  width: 44%;
  margin: 0.5em;
}
</style>