<template>
  <div class="program">
    <Header />

    <section class="program__top">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-auto">
            <div class="program__top-title">
              <h1>{{ api.title }}</h1>
              <p>* {{ api.utc }}</p>
            </div>
          </div>
          <div class="col-md-auto">
            <ul class="program__days">
              <li v-for="day in days" :key="day">{{ day }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="program__content">
      <div class="container">
        <div v-for="prog in api.program" :key="prog.title">
          <div class="program__content-title">{{ prog.title }}</div>

          <div
            class="program__content-list"
            v-for="(list, id) in prog.list"
            :key="id"
          >
            <div>
              <div class="program__content-time">
                {{ list.time }}
              </div>
              <br />
              <a
                v-if="list.link"
                :href="list.link"
                target="_blank"
                class="program__content-link"
              >
                <img src="@/assets/images/zoom.png" alt="" />
              </a>
            </div>
            <div>
              <div class="program__content-name">{{ list.name }}</div>
              <div class="program__content-text" v-html="list.text"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import API from "@/static/program";

export default {
  components: { Header, Footer },
  data() {
    return {
      days: ["03.11", "04.11", "05.11", "06.11", "07.11", "08.11"]
    };
  },
  computed: {
    api() {
      const lang = this.$store.state.curLang;
      return API[lang];
    }
  }
};
</script>
