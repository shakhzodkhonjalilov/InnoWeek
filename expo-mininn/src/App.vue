<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import vueHeadful from "vue-headful";

Vue.component("vue-headful", vueHeadful);

axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

export default {
  name: "App",

  data: () => ({
    components: {
      vueHeadful,
    },
    //
  }),
  methods: {
    changeThem() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
    },
  },
};
</script>
