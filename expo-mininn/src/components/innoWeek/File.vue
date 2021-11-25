<template>
  <div class="application__block file">
    <div class="application__title">{{ fileData.title }}</div>

    <div class="file__title">{{ fileData.subTitle }}</div>
    <div class="file__requirement">
      {{ fileData.text1 }}
      <a :href="requireFile" download>{{fileData.link}}</a>
      {{ fileData.text2 }}
      <div class="file__faq">
        {{ fileData.faq }}
        <div>
          <a href="tel:+998909015556">+998 90 9015556;</a>
          <a href="tel:+998939921815">+998 93 9921815.</a>
        </div>
      </div>
    </div>

    <div class="file_loading mt-5" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <div class="my-5">
      <ul v-if="errFiles.length" class="file__list file__list-error">
        <li v-for="(err, id) in errFiles" :key="id">
          Размер:
          <span>{{ err.name }}</span>
          ({{ toMB(err.size) }} мб) превышает 100 мб
        </li>
      </ul>

      <ul class="file__list">
        <li v-for="(file, idx) in files" :key="idx">
          <div class="file__list-name">{{ file.name }}</div>
          <div class="file__list-size">{{ toMB(file.size)}} мб</div>
          <v-btn icon @click="removeFile(idx)">
            <img src="@/assets/images/clear.png" alt />
          </v-btn>
        </li>
      </ul>
    </div>

    <div class="file__down">
      <label>
        {{ fileData.btn }}
        <v-file-input
          class="file__down-inp"
          outlined
          @change="logoFileHandler($event)"
          required
          prepend-icon="mdi-paperclip"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      errFiles: [],
      logoFiles: [],
      currLogoFiles: [],
      formData: {
        logo: [],
      },
      loading: false,
    };
  },
  computed: {
    fileData() {
      return this.$store.getters.appFile;
    },
    requireFile() {
      const lang = this.$store.getters.lang;
      return `/required/${lang}.pdf`;
    },
  },
  methods: {
    async logoFileHandler(event) {
      if (!event) return false;
      const size = event.size / Math.pow(1024, 2);
      this.errFiles = [];

      if (size > 100) {
        this.errFiles = [...this.errFiles, event];
        return;
      }
      this.files = [...this.files, event];
      this.$store.dispatch("setUser", { optionalFile: this.files });
    },
    removeFile(id) {
      this.files = this.files.filter((file, idx) => idx !== id);
      this.$store.dispatch("setUser", { optionalFile: this.files });
      if (!this.files.length) {
        this.errFiles = [];
      }
    },
    toMB(num) {
      return (num / Math.pow(1024, 2)).toFixed(2);
    },
  },
};
</script>
