<template>
  <div
    :class="buttonClass"
    :block="block"
    :round="round"
    :circle="circle"
    :disabled="disabled"
    :loading="loading"
    @click="onButtonClick"
  >
    <Loading v-if="loading" color="inherit" style="margin-right: 0.25em" />
    <slot />
  </div>
</template>

<script>
import Loading from "../loading";

export default {
  name: "Button",
  components: {
    Loading,
  },
  props: {
    fill: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    block: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: true,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    to: String
  },
  computed: {
    canClick() {
      return !this.disabled && !this.loading;
    },
    buttonClass() {
      let cls = ["button"];
      if (this.canClick) {
        cls.push("button-hover");
      }
      cls.push("button-" + (this.fill ? "fill" : "plain"));
      if (this.type) {
        cls.push(this.type);
      }
      return cls;
    },
  },
  methods: {
    onButtonClick() {
      if (!this.canClick) return;
      if (this.to) return this.$router.push(this.to);
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  width: auto;
  padding: 0 0.75em;
  line-height: 1.8;
  text-align: center;
  color: $gray-6;
  background-color: $white;
  overflow: hidden;

  &[block] {
    display: block;
    padding: 0.375em 0.75em;
  }

  &[round] {
    border-radius: 0.375em;

    &[block] {
      border-radius: 0.5em;
    }
  }

  &[circle] {
    border-radius: 1em;

    &[block] {
      border-radius: 1.3em;
    }
  }

  &[disabled] {
    color: $gray-c;
    cursor: not-allowed;
  }

  &.button-plain {
    box-sizing: border-box;
    border: 1px solid $gray-d;

    &[disabled] {
      border-color: $gray-eb;
    }

    &.primary {
      color: $blue;
      border-color: $blue-3;
      background-color: $blue-4;

      &[disabled] {
        color: $blue-1;
      }
    }

    &.success {
      color: $green;
      border-color: $green-3;
      background-color: $green-4;

      &[disabled] {
        color: $green-1;
      }
    }

    &.info {
      color: $gray-9;
      border-color: $gray-d;
      background-color: $gray-f;

      &[disabled] {
        color: $gray-b;
      }
    }

    &.warning {
      color: $orange;
      border-color: $orange-3;
      background-color: $orange-4;

      &[disabled] {
        color: $orange-1;
      }
    }

    &.danger {
      color: $red;
      border-color: $red-3;
      background-color: $red-4;

      &[disabled] {
        color: $red-1;
      }
    }
  }

  &.button-fill {
    color: $white;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);

    &.primary {
      background-color: $blue;

      &[disabled] {
        background-color: $blue-2;
      }
    }

    &.success {
      background-color: $green;

      &[disabled] {
        background-color: $green-2;
      }
    }

    &.info {
      background-color: $gray-9;

      &[disabled] {
        background-color: $gray-c;
      }
    }

    &.warning {
      background-color: $orange;

      &[disabled] {
        background-color: $orange-2;
      }
    }

    &.danger {
      background-color: $red;

      &[disabled] {
        background-color: $red-2;
      }
    }
  }
}
</style>