<template>
  <div class="request__status">
    <v-container>
      <vue-headful title="Заявка на стартап" />
      <div class="text-center">
        <div class="request__status-title request__margin">{{num}}</div>
        <div class="request__text">
          <div class="request__status-title">{{ this.status }}</div>
          <div v-if="comment">
            <span></span>
            <h3>{{ this.comment }}</h3>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    num: "",
    status: "",
    comment: "",
  }),
  name: "Status",
  methods: {
    async fetch() {
      const id = this.$router.currentRoute.query.id;
      let res = await axios.get(`requests/${id}`);
      const data = res.data;
      const uz = "sonli";
      let arr = data[0].split(" - ");
      if (data[0].includes(uz)) {
        this.num = data[0].replace(`- ${arr[2]}`, "");
        this.status = arr[2];
      } else {
        this.num = arr[0];
        this.status = arr[1];
      }
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.request__status {
  display: flex;
  margin-top: 10%;
  .request {
    &__status-title {
      text-transform: uppercase;
      font-size: 28px;
      font-weight: 700;
    }
    &__margin {
      margin: 50px 0 20px;
    }
    &__text {
      background: #d1d3eb;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      span {
        display: block;
        max-width: 150px;
        width: 100%;
        height: 2px;
        background: #ffffff;
        margin: 5px auto 10px;
      }
    }
  }
}
</style>
