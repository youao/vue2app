<template>
  <div class="header">
    <div class="safe-top"></div>
    <div class="header-content">
      <slot>
        <div class="aside left">
          <slot name="left">
            <Icon :name="leftIcon" class="icon" @click.native="tapLeft" />
          </slot>
        </div>
        <div class="title" :style="titleStyle">
          <slot name="title">
            <div class="title-content" :class="titleAlign">{{ title }}</div>
          </slot>
        </div>
        <div class="aside right">
          <slot name="right">
            <Icon
              v-for="(item, index) in rightIcons"
              :key="index"
              :name="item.name"
              class="icon"
              @click.native="tapRightIcon(item)"
            />
          </slot>
        </div>
      </slot>
    </div>

    <template v-if="popIcons.length">
      <Popup :show="showPop" position="bottom" @mask-click="showPop = false">
        <div class="wrap">
          <div class="content">
            <div
              class="pop-icon"
              v-for="(item, index) in popIcons"
              :key="index"
            >
              <Icon :name="item.name" :svg="item.svg" @click.native="tapRightIcon(item)" />
            </div>
          </div>
        </div>
      </Popup>
    </template>
  </div>
</template>

<script>
import Icon from "@/components/icon";
import Popup from "@/components/popup";

export default {
  name: "Header",
  components: {
    Icon,
    Popup,
  },
  props: {
    title: String,
    titleAlign: {
      type: String,
      default: "center",
    },
    leftIcon: {
      type: String,
      default: "back",
    },
    leftHide: {
      type: Boolean,
      default: false,
    },
    rightIcon: {
      type: Array | String,
      default() {
        return "";
      },
    },
  },
  computed: {
    isCenter() {
      return this.titleAlign == "center";
    },
  },
  data() {
    return {
      rightIcons: [],
      popIcons: [],
      showPop: false,
      titleStyle: "",
    };
  },
  created() {
    if (this.rightIcon && this.rightIcon.length) {
      this.getRightIcons(this.rightIcon);
    } else {
      if (!this.leftHide && this.isCenter) {
        this.titleStyle = "margin-right: 1.8em;";
      }
    }
  },
  methods: {
    tapLeft() {
      this.$emit("tap-left");
    },
    tapRightIcon(item) {
      switch (item.type) {
        case "more":
          this.showPop = !0;
          break;
        default:
          this.$emit("tap-right", item);
          if (this.showPop) {
            this.showPop = !1;
          }
          break;
      }
    },
    getRightIcons(icons) {
      if (typeof icons == "string") {
        this.rightIcons = [{ name: icons }];
        return;
      }
      let size = icons.length;
      if (size <= 2 || (size <= 1 && this.isCenter)) {
        this.rightIcons = icons;
        this.popIcons = [];
        return;
      }
      const iconMore = { name: "more-dot", type: "more" };
      if (this.isCenter) {
        this.rightIcons = [iconMore];
      } else {
        this.rightIcons = icons.slice(0, 1);
        this.rightIcons.push(iconMore);
      }
      this.popIcons = icons;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #fff;
  border-bottom: 1px solid #eee;

  .header-content {
    display: flex;
    align-items: center;
    height: 3em;

    .title {
      flex: 1;
      overflow: hidden;
      .title-content {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.center {
          text-align: center;
        }
      }
    }
  }

  .icon {
    width: 1.8em;
    font-size: 1.2em;
    text-align: center;
  }
}

.wrap {
  background: #fff;
  padding: 1em 0;
  border-radius: 0.5em 0.5em 0 0;
  overflow: hidden;

  .content {
    padding-top: 1em;

    .pop-icon {
      display: inline-block;
      width: 3em;
      height: 3em;
      border-radius: 0.5em;
      background: #eee;
      text-align: center;
      margin-bottom: 1em;
      margin-left: 1em;

      i {
        font-size: 1.5em;
        line-height: 2em;
        color: #666;
      }
    }
  }
}
</style>