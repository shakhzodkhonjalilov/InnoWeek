<template>
  <div>
    <h1 class="text-center">№{{id}} Статус вашей заявки - {{status}}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    status: "",
    id: "",
  }),
  name: "Status",
  async mounted() {
    const id = this.$router.currentRoute.query.id;
    let res = await axios.get(`/innovations-rest/api/requests/${id}`);
    this.status = res.data;
    this.id = id;
  },
};
</script>