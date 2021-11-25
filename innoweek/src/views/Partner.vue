<template>
  <div class="partner page">
    <Header />

    <section class="top">
      <div class="container">
        <div class="top__logo">
          <img src="@/assets/images/logo_sp.png" alt />
        </div>

        <h2 class="top__title">{{ api.title }}</h2>
        <h1 class="top__text" v-html="api.subTitle"></h1>
      </div>
    </section>

    <section class="partner__content">
      <div class="container">
        <p v-for="(text, idx) in api.text" :key="idx">{{ text }}</p>

        <div class="text-center">
          <a href="http://spcenter.uz" target="_blank" class="btn">{{
            api.btn
          }}</a>
        </div>
      </div>
    </section>

    <!-- <section class="partner__list">
      <div class="container">
        <div class="title">Партнеры</div>

        <div class="row">
          <div class="col-lg-6">
            <a href="http://smartchain.uz" target="_blank" class="partner__list-block">
              <img src="@/assets/images/partner-1.png" alt />
              <div>Технический партнер</div>
            </a>
          </div>
          <div class="col-lg-6">
            <a href="https://nazzar.uz" target="_blank" class="partner__list-block">
              <img src="@/assets/images/partner-2.png" alt />
              <div>Технический партнер</div>
            </a>
          </div>
        </div>
      </div>
    </section>-->

    <Footer />
  </div>
</template>

<script>
import API from "../static/organizer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

<style></style>
