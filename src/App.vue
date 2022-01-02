<template>
  <div class="app">
    <div class="app-content">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer";
export default {
  components: {
    Footer,
  },
  created() {
    this.$store.dispatch("APPINFO");
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

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>
