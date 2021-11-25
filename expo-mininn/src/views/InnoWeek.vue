<template>
  <div>
    <Header />

    <v-main>
      <div v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else>
        <Application />
      </div>
    </v-main>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Application from "@/components/innoWeek/Application";

export default {
  components: { Header, Footer, Application },
  methods: {
    async lang() {
      const cur = this.$store.getters.lang;
      await this.$store.dispatch("getData", cur);
      this.loading = await false;
    },
    curLocation() {
      const lang = localStorage.getItem("curLocation");
      if (!lang) {
        localStorage.setItem("curLocation", "ru");
        this.$store.dispatch("changeLang", "ru");
      } else if (lang == "en") {
        this.$store.dispatch("changeLang", "en");
      } else if (lang == "uz") {
        this.$store.dispatch("changeLang", "uz");
      }
    },
  },
  created() {
    this.curLocation();
  },
  mounted() {
    this.lang();
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>
