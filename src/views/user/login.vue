<template>
  <Page>
    <div class="cell-box">
      <div class="cell">
        <span class="cell-key">手机号</span>
        <input class="flex-con" type="text" />
      </div>
      <div class="cell">
        <span class="cell-key">验证码</span>
        <input class="flex-con" type="text" />
        <span class="btn-send">发送验证码</span>
      </div>
    </div>
    <Button block loading class="btn-sub">确认</Button>
  </Page>
</template>

<script>
import Button from "@/components/button";
export default {
  components: {
    Button,
  },
  data() {
    return {
      token: "",
    };
  },
};
</script>

<style scoped lang="scss">
.cell-box {
  border-top: 1px solid $gray-d;
  border-bottom: 1px solid $gray-d;
  background-color: #fff;
  margin: 0.2rem 0;
  padding-left: 0.2rem;
}
.cell {
  display: flex;
  align-items: center;
  padding: 0.3rem 0.1rem;
  border-bottom: 1px solid $gray-e;

  &:last-of-type {
    border-bottom: 0;
  }

  .cell-key {
    width: 1.6rem;
    margin-right: 0.1rem;
  }

  input {
    width: 100%;
    font-size: 1em;
  }
}

.btn-send {
  width: 2.4rem;
  font-size: 0.28rem;
  text-align: center;
  border-left: 1px solid $gray-e;
}

.btn-sub {
  margin: 0 0.3rem;
}
</style>