<template>
  <div class="terms page">
    <Header />

    <section class="terms__top">
      <div class="container">
        <h1 v-html="api.title"></h1>
      </div>
    </section>

    <section class="terms__content">
      <div class="container">
        <div v-html="api.text"></div>

        <div class="text-center">
          <a
            href="https://wif2020.ru/forum/#site-header"
            target="_blank"
            class="btn"
            >{{ api.link }}</a
          >
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import API from "@/static/wyif";

export default {
  components: { Header, Footer },
  computed: {
    api() {
      const lang = this.$store.state.curLang;
      return API[lang];
    }
  }
};
</script>
