<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('APPINFO')
  },
};
</script>

<style>
body {
  margin: 0;
}
a {
  text-decoration: none;
}
img {
  display: block;
  width: 100%;
}
button,
input {
  border: 0;
  outline: none;
  background: none;
}
</style>
