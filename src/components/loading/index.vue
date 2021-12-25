<template>
  <div class="loading" :style="{ color }"></div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    color: {
      type: String,
      default: "inherit",
    },
  },
};
</script>

<style scoped>
.loading {
  font-size: 1em;
  display: inline-flex;
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  animation: circleLoading 1s steps(60, end) infinite;
}
.loading::before,
.loading::after {
  content: "";
  display: block;
  width: 0.5em;
  height: 1em;
  box-sizing: border-box;
  border: 0.125em solid;
  border-color: currentColor;
}
.loading::before {
  border-right-width: 0;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  mask-image: -webkit-linear-gradient(
    top,
    #000000 8%,
    rgba(0, 0, 0, 0.3) 95%
  );
}
.loading::after {
  border-left-width: 0;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  mask-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 8%,
    rgba(0, 0, 0, 0.3) 95%
  );
}
@keyframes circleLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>