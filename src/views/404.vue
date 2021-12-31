<template>
  <Page>
    <Message icon="404" :buttons="buttons" @button-click="onButtonClick">
      <div class="msg">找不到页面喔~</div>
    </Message>
  </Page>
</template>

<script>
import Message from "@/components/message";

export default {
  name: "notFound",
  components: {
    Message,
  },
  data() {
    return {
      buttons: [{ text: "返回首页" }],
    };
  },
  methods: {
    onButtonClick(e) {
      if (e.index == 0) {
        this.$router.push('/')
      }
    }
  }
};
</script>
<style scoped lang="scss">
.msg {
  font-size: 0.24rem;
  color: $gray-9;
  margin: 0.2rem;
}
</style>