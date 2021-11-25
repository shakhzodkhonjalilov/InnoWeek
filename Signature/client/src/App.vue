<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <a href="#" class="header__logo">
          <img src="@/assets/logo.png" alt="logo" />
        </a>

        <ul class="header__lang">
          <li v-for="lang in languages" :key="lang.name">
            <a
              href="#"
              class="header__link"
              :class="{ active: lang.name == currentLanguage }"
              @click.prevent="changeLang(lang.name)"
            >
              {{ lang.title }}
            </a>
          </li>
        </ul>
      </div>
    </header>
    <main class="wrapper">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ],
      currentLanguage: localStorage.getItem("language") || "ru"
    };
  },
  methods: {
    changeLang(val) {
      localStorage.setItem("language", val);
      this.currentLanguage = val;
      location.reload();
    }
  }
};
</script>
