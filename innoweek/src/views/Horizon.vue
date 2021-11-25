<template>
  <div class="irc page">
    <Header />

    <section class="terms__top">
      <div class="container">
        <h1>HORIZON 2020</h1>
      </div>
    </section>

    <section class="terms__content">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <img src="@/assets/images/horizon.jpg" alt="" class="mb-4" />
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

import API from "@/static/Horizon";

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    api() {
      const lang = this.$store.state.curLang;
      return API[lang];
    }
  }
};
</script>