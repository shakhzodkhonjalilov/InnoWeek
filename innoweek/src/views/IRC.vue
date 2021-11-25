<template>
  <div class="irc page">
    <Header />

    <section class="terms__top">
      <div class="container">
        <h1>IRC</h1>
      </div>
    </section>

    <section class="terms__content">
      <div class="container">
        <div class="row">
          <div class="col-sm-2 col-4">
            <img src="@/assets/images/IRC.png" alt="" />
          </div>
          <div class="col-sm col-8">
            <div class="irc__title" v-html="api.title"></div>
          </div>
        </div>

        <div v-html="api.text"></div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import API from "@/static/IRC";

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
