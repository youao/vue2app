<template>
  <transition name="fade">
    <div
      v-show="show"
      class="position-full fixed"
      :class="position == 'center' ? 'fmix-center' : ''"
      :style="{ 'z-index': zIndex }"
    >
      <div
        v-if="mask"
        class="position-full"
        :style="{ backgroundColor: maskColor }"
        @click="$emit('mask-click')"
      ></div>
      <transition :name="transName">
        <div
          v-show="show"
          :class="position == 'center' ? 'position-r fmix-center' : 'position'"
          :style="wrapStyle"
        >
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { objectToStr } from "@/utils/index";
import Vue from "vue";

export default {
  name: "Popup",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String | Object,
      default: "center",
    },
    animate: String,
    mask: {
      type: Boolean | Number | String,
      default: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: String | Object,
      default: "",
    },
  },
  data() {
    return {
      zIndex: 0,
    };
  },
  computed: {
    isfull() {
      return this.mask || this.lock;
    },
    maskColor() {
      if (!this.mask) return "";
      switch (typeof this.mask) {
        case "number":
          return "rgba(0,0,0," + Math.min(1, this.mask) + ")";
        case "string":
          return this.mask;
        case "boolean":
          return "rgba(0,0,0,0.6)";
      }
    },
    positionStyle() {
      let p = this.position;
      if (!p) return "";
      if (typeof p == "object") return objectToStr(p, "style");
      if (["top", "right", "bottom", "left", "center"].indexOf === -1)
        return ";" + p;
      switch (p) {
        case "top":
          return ";top:0;right:0;left:0;margin:auto";
        case "right":
          return ";top:0;right:0;bottom:0;margin:auto";
        case "bottom":
          return ";right:0;bottom:0;left:0;margin:auto";
        case "left":
          return ";top:0;bottom:0;left:0;margin:auto";
        case "center":
          return "";
      }
    },
    _styls() {
      let p = this.styles;
      if (!p) return "";
      if (typeof p == "object") return objectToStr(p, "style");
      return ";" + p;
    },
    wrapStyle() {
      return this.positionStyle + this._styls;
    },
    transName() {
      if (this.animate) return this.animate;
      if (
        typeof this.position == "string" &&
        ["top", "right", "bottom", "left", "center"].indexOf(this.position) > -1
      )
        return "slide-" + this.position;
      return "";
    },
  },
  created() {
    this.updateZIndex();
  },
  methods: {
    updateZIndex() {
      if (!Vue.PopupZIndex) {
        Vue.PopupZIndex = 999;
      }
      Vue.PopupZIndex++;
      this.zIndex = Vue.PopupZIndex;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-center-enter {
  transform: translateY(10%);
}
.slide-center-enter-active,
.slide-top-enter-active,
.slide-top-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s;
}
.slide-top-enter,
.slide-top-leave-to {
  transform: translateY(-100%);
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  transform: translateY(100%);
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.fixed {
  position: fixed !important;
}
.position {
  position: absolute;
}
.position-r {
  position: relative;
}
.position-full {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.fmix-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>