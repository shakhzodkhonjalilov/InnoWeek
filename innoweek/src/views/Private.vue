<template>
  <div class="program private">
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
              <li
                v-for="day in days"
                :key="day.link"
                @click="scrollHandler(day.link)"
                :class="defineDate(day.name)"
              >
                {{ day.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="program__content">
      <div class="container">
        <div v-for="prog in api.program" :id="prog.id" :key="prog.title">
          <div class="program__content-title">{{ prog.title }}</div>
          <div
            class="program__content-list"
            v-for="(list, id) in prog.list"
            :key="id"
            :class="defineTime(list.date)"
          >
            <div class="program__content-time">
              {{ list.time }}
              <p v-if="defineTime(list.date) == 'active'">
                {{ api.live }}
              </p>
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

import API from "@/static/private";

export default {
  components: { Header, Footer },
  data() {
    return {
      days: [
        { name: "03.11", link: "first" },
        { name: "04.11", link: "second" },
        { name: "05.11", link: "third" },
        { name: "06.11", link: "fourth" },
        { name: "07.11", link: "fifth" },
        { name: "08.11", link: "sixth" }
      ]
    };
  },
  computed: {
    api() {
      const lang = this.$store.state.curLang;
      return API[lang];
    }
  },
  methods: {
    scrollHandler(to) {
      let element = document.querySelector(`#${to}`);
      let top = element.offsetTop;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    },
    defineTime(time) {
      if (time) {
        const start = Date.UTC(...time[0].split(","));
        const end = Date.UTC(...time[1].split(","));
        const now = new Date().getTime();
        if (now <= end && now >= start) {
          return "active";
        } else if (now > start) {
          return "passed";
        }
      }
    },
    defineDate(date) {
      console.log(date);
      let d = date.slice(1, 2);
      return new Date().getDate() == d;
    }
  }
};
</script>
