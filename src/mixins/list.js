import Loading from "@/components/loading";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      list: [],
      where: {
        page: 1,
        pagesize: 10,
      },
      loading: false,
      finished: false,
      responseKey: "r",
      limitKey: "pagesize",
    };
  },
  methods: {
    getList(reload) {
      if (reload) {
        this.where.page = 1;
        this.loading = false;
        this.finished = false;
      }
      if (this.loading || this.finished) return;
      this.loading = true;
      this.getListApi &&
        this.getListApi()
          .then((res) => {
            let data = this.getResponseData(res) || [];
            if (reload) {
              this.list = data;
            } else {
              data.length && this.list.push.apply(this.list, data);
            }
            if (data.length != this.where[this.limitKey]) {
              this.finished = true;
            } else {
              this.where.page++;
            }
          })
          .catch((err) => {
            this.$toast(err);
            this.finished = true;
          })
          .finally(() => {
            this.loading = false;
            reload && this.finishRefresh();
          });
    },
    // getListApi() {
    //   return getAppGoods(this.where);
    // },
    getResponseData(res) {
      const keys = this.responseKey.split(".");
      for (let i = 0, count = keys.length; i < count; i++) {
        res = res[keys[i]];
      }
      return res;
    },
    onReachBottom() {
      this.getList();
    },
    onRefresh() {
      this.getList(1);
    },
    finishRefresh() {
      this.$refs.page && this.$refs.page.finishRefresh();
    },
  },
};
