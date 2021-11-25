<template>
  <div>
    <TopSection />

    <section class="application">
      <v-container>
        <v-form ref="form" v-model="valid" accept-charset="UTF-8">
          <Form />
          <Stand />
          <File />

          <div class="application__agreement">
            <v-checkbox v-model="rules" hide-details>
              <template v-slot:label>
                <a :href="app.rulesLink" target="_blank" @click.stop>{{app.rules}}</a>
              </template>
            </v-checkbox>
          </div>

          <div class="text-center mb-5" v-if="waiting">
            <v-progress-circular indeterminate color="primary" />
            <div class="my-3">{{ app.waiting }}</div>
          </div>
          <div class="application__procent">
            <v-progress-linear v-if="loading" :value="loadingProcent" height="25" rounded>
              <strong>{{ Math.ceil(loadingProcent) }}%</strong>
            </v-progress-linear>
          </div>

          <button
            class="application__send"
            @click.prevent="submit($event)"
            :disabled="inValid"
            v-if="!loading && !waiting"
          >{{app.btn}}</button>
        </v-form>
      </v-container>

      <v-dialog v-model="dialog" width="770">
        <div class="application__modal">
          <div class="modal__body">
            <div class="modal__title">{{app.reqText}}</div>
            <div class="modal__number">
              {{app.reqNum}}
              <strong>{{number}}</strong>
            </div>
            <p>{{app.reqLink}}</p>
            <a :href="linkSuccessMessage" target="_blank" class="modal__link">{{app.reqCheck}}</a>
          </div>
        </div>
      </v-dialog>
    </section>

    <v-snackbar v-model="error" :timeout="timeout" centered color="pink lighten-1">
      Ошибка сервера
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="error = false">Закрыть</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import TopSection from "@/components/innoWeek/TopSection";
import Form from "@/components/innoWeek/Form";
import Stand from "@/components/innoWeek/Stand";
import File from "@/components/innoWeek/File";

import axios from "axios";

export default {
  components: { TopSection, Form, Stand, File },
  data() {
    return {
      rules: false,
      dialog: false,
      loading: false,
      valid: true,
      number: 35,
      loadingProcent: 0,
      linkSuccessMessage: "http",
      lang: null,
      error: false,
      timeout: 15000,
      waiting: false,
    };
  },
  computed: {
    app() {
      return this.$store.getters.appReq;
    },
    inValid() {
      return !this.checkRequired();
    },
    formData() {
      return this.$store.getters.user;
    },
    curLang() {
      return this.$store.getters.lang;
    },
  },
  methods: {
    async submit() {
      await this.$refs.form.validate();
      let fields = this.$refs.form.inputs.filter((el) => el.valid === false);
      if (fields.length) this.valid = false;

      if (this.valid) {
        this.loading = true;
        if (this.curLang === "uz") {
          this.formData.language = this.lang.data[0].id;
        } else if (this.curLang === "ru") {
          this.formData.language = this.lang.data[1].id;
        } else if (this.curLang === "en") {
          this.formData.language = this.lang.data[2].id;
        }

        const config = {
          headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
          onUploadProgress: (progressEvent) => {
            this.loadingProcent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (this.loadingProcent == 100) {
              this.loading = false;
              this.waiting = true;
            }
          },
        };

        let formData = new FormData();
        Object.keys(this.formData).forEach((key) => {
          if (key == "optionalFile") {
            for (let i = 0; i < this.formData[key].length; i++) {
              formData.append(
                key,
                this.formData[key][i],
                encodeURI(this.formData[key][i].name)
              );
            }
          } else {
            formData.append(key, this.formData[key]);
          }
        });

        try {
          let id = await axios.post("mpdeclarants", formData, config);
          this.linkSuccessMessage =
            this.linkSuccessMessage + id.data.split("http")[1];
          let num = id.data.split("\n")[0];
          this.number = parseInt(num.match(/\d+/));

          this.loading = false;
          this.waiting = false;
          this.dialog = await true;
        } catch (error) {
          this.error = true;
          this.loading = false;
        }
      } else {
        let fields = this.$refs.form.inputs.filter((el) => el.valid === false);
        if (fields.length) {
          window.scrollTo({
            top: fields[0].$el.offsetTop - 50,
            behavior: "smooth",
          });
        }
      }
    },
    checkRequired() {
      const user = this.formData;
      if (!this.rules) return false;
      if (!user.optionalFile.length) return false;
      const required = [
        "firstName",
        "secondName",
        "email",
        "phone",
        "position",
        "country",
        "company",
        "mainActivity",
        "standType",
        "mainColor",
      ];
      let valid = required.filter((key) => user[key]);
      return required.length === valid.length;
    },
  },
  async mounted() {
    this.lang = await axios.get("languages");
  },
  watch: {
    dialog(val) {
      if (!val) {
        location.reload();
      }
    },
    curLang() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
