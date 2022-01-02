<template>
  <Page ref="page" refresh @refresh="onRefresh" @reach-bottom="onReachBottom">
    <div>
      <div v-for="(item, index) in list" :key="index" class="list-item">
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-show="finished" class="row">到底了喔~</div>
    <div v-show="loading" class="row"><Loading /> 加载中...</div>
  </Page>
</template>

<script>
import { getJdGoods } from "@/api/quan2";
import list from "@/mixins/list";
export default {
  mixins: [list],
  components: {},
  data() {
    return {
      where: {
        q: "",
        cid: 0,
        page: 1,
        pagesize: 10,
      },
      responseKey: "data.data",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getListApi() {
      return getJdGoods(this.where);
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  padding: 0.2rem;
  border-bottom: 1px solid $gray-e;

  .img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.12rem;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }

  .info {
    flex: 1;
    margin-left: 0.2rem;
    overflow: hidden;
  }
}

.row {
  padding: 0.2rem;
  font-size: 0.24rem;
  text-align: center;
  color: $gray-9;
}
</style>