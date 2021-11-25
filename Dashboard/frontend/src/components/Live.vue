<template>
  <div class="live">
    <div class="title">{{ text.live }}</div>
    <div class="container">
      <div class="row">
        <div class="col-xl-6" v-for="(item, idx) in live" :key="idx">
          <iframe
            class="live__camera"
            width="100%"
            :src="item.value"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="live__label">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Language from "@/static/language";
export default {
  data() {
    return {
      live: []
    };
  },
  computed: {
    lang() {
      let lang = this.$route.params.id;
      if (!lang) {
        lang = "ru";
      }
      return lang;
    },
    text() {
      return Language[this.lang];
    }
  },
  methods: {
    async getLive() {
      const res = await this.$axios.get("getLive");
      const live = await res.data;
      this.live = live;
    }
  },
  mounted() {
    this.getLive();
  }
};
</script>
