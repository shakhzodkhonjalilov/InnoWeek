<template>
  <v-app>
    <header>
      <v-container size="lg" class="py-0">
        <div class="header__content">
          <a href="http://innoweek.uz" class="header__logo">
            <img src="@/assets/images/logo.png" alt="logo" />
          </a>
          <div>
            <ul class="header__lang">
              <li v-for="lang in languages" :key="lang.name">
                <a
                  href="#"
                  class="header__link"
                  :class="{ active: lang.name == curLang.name }"
                  @click.prevent="changeLang(lang)"
                  >{{ lang.title }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </v-container>
    </header>
    <main class="content">
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      curLang: null,
      languages: [
        {
          name: "uz",
          title: "O'zb",
          text: "Virtual ko’rgazmaning tili: O’zbek"
        },
        {
          name: "ru",
          title: "Рус",
          text: "Язык виртуальной выставки: Русский"
        },
        {
          name: "en",
          title: "Eng",
          text: "Virtual exhibition language: English"
        }
      ]
    };
  },
  methods: {
    changeLang(lang) {
      this.curLang = lang;
      sessionStorage.setItem("lang", lang.name);
    },
    lang() {
      let lang = sessionStorage.getItem("lang");
      if (lang) {
        this.languages.map(el => {
          if (el.name == lang) {
            this.curLang = el;
          }
        });
      } else {
        this.curLang = this.languages[1];
        sessionStorage.setItem("lang", this.curLang.name);
      }
    }
  },
  created() {
    this.lang();
  }
};
</script>
