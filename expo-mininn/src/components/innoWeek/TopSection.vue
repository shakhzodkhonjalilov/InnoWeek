<template>
  <section class="top">
    <v-container>
      <h1>
        <div v-html="topData.title"></div>
      </h1>
      <h2>
        {{ topData.subtitle }}
        <span>{{ topData.deadline }}</span>
      </h2>

      <v-row justify="center">
        <v-col lg="10">
          <div class="top__content">
            <div class="top__text" v-for="(text, idx) in topData.text" :key="idx" v-html="text"></div>

            <div class="btn__group">
              <a
                href="https://innoweek.nazzar.uz"
                target="_blank"
                class="btn btn-example"
              >{{ topData.btnExp }}</a>
              <a :href="requireFile" download class="btn btn-request">{{ topData.btnReq }}</a>
            </div>
          </div>
        </v-col>
      </v-row>

      <a href="#" class="top__scroll" @click.prevent="appScroll">
        <img src="@/assets/images/down.png" alt />
      </a>
    </v-container>
  </section>
</template>

<script>
export default {
  computed: {
    topData() {
      return this.$store.getters.topData;
    },
    requireFile() {
      const lang = this.$store.getters.lang;
      return `/required/${lang}.pdf`;
    },
  },
  methods: {
    appScroll() {
      const app = document.querySelector(".application");
      app.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  },
};
</script>
