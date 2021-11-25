<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <a href="https://innoweek.uz" class="logo">
          <img src="@/assets/images/logo.png" alt="" />
        </a>
        <ul class="header__lang">
          <li v-for="lang in languages" :key="lang.name">
            <a
              :href="'/' + lang.name"
              class="header__link"
              :class="{ active: lang.name == currentLanguage }"
            >
              {{ lang.title }}
            </a>
          </li>
        </ul>
      </div>
    </header>
    <main class="main">
      <div class="container py-0">
        <h1 class="main__title" v-html="api.title"></h1>

        <div class="row">
          <div class="col-md-6 py-0 ">
            <div class="main__text">
              <h3 class="sub-title" v-html="api.subTitle"></h3>

              <p v-html="api.text"></p>
            </div>

            <div class="main__down">
              <Form @set-name="setName($event)" v-if="!user" :api="api.form" />
              <Images
                :user="user"
                v-else
                :api="api.images"
                :lang="currentLanguage"
              />
            </div>
          </div>
          <div class="col-md-6 py-0">
            <div class="main__img">
              <img :src="imageHandler('handle')" alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Form from "@/components/Form";
import Images from "@/components/Images";

import API from "@/static/api";

export default {
  name: "Home",
  components: { Form, Images },
  data() {
    return {
      user: null,
      languages: [
        {
          name: "uz",
          title: "O'zb"
        },
        {
          name: "ru",
          title: "Рус"
        },
        {
          name: "en",
          title: "Eng"
        }
      ]
    };
  },
  computed: {
    currentLanguage() {
      let lang = this.$route.params.id;
      return lang ? lang : "ru";
    },
    api() {
      return API[this.currentLanguage];
    }
  },
  methods: {
    setName(name) {
      this.user = name;
    },
    imageHandler(name) {
      return require(`@/assets/images/${name}-${this.currentLanguage}.png`);
    },
    changeLang(lang) {
      this.$router.push(`/${lang}`);
    }
  }
};
</script>