<template>
  <div class="application__block">
    <div class="application__title">{{ formData.title }}</div>

    <v-row class="form" no-gutters>
      <v-col sm="6" cols="12">
        <v-text-field
          v-model="user.firstName"
          outlined
          :label="formData.inputs.firstName"
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field
          v-model="user.secondName"
          outlined
          :label="formData.inputs.secondName"
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field
          type="email"
          v-model="user.email"
          outlined
          required
          :label="formData.inputs.email"
          :rules="emailRules"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field
          type="tel"
          v-model="user.phone"
          :label="formData.inputs.phone"
          outlined
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-autocomplete
          v-model="user.country"
          :items="countries"
          :label="formData.inputs.country.label"
          outlined
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field type="text" v-model="user.city" outlined :label="formData.inputs.city" />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field
          type="text"
          v-model="user.company"
          outlined
          :label="formData.inputs.company"
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field
          type="text"
          v-model="user.position"
          :label="formData.inputs.position"
          outlined
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-select
          v-model="user.mainActivity"
          :items="mainActivities"
          :item-text="nameActivities"
          item-value="id"
          :label="formData.inputs.mainActivity"
          outlined
          required
          :rules="rulesReq"
        />
      </v-col>
      <v-col sm="6" cols="12">
        <v-text-field type="text" v-model="user.website" outlined :label="formData.inputs.website" />
      </v-col>

      <v-col sm="6" cols="12" offset-sm="6">
        <div class="form__text">{{formData.text}}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      rulesReq: [(v) => !!v || this.formData.error.required],
      emailRules: [
        (v) => !!v || this.formData.error.required,
        (v) => /.+@.+\..+/.test(v) || this.formData.error.email,
      ],
      mainActivities: [],
      nameActivities: "ruName",
    };
  },
  computed: {
    formData() {
      return this.$store.getters.appForm;
    },
    user() {
      return this.$store.getters.user;
    },
    countries() {
      return this.$store.getters.countries;
    },
    lang() {
      return this.$store.getters.lang;
    },
  },
  methods: {
    async activities() {
      if (this.lang == "uz") {
        this.nameActivities = "uzName";
      } else if (this.lang == "ru") {
        this.nameActivities = "ruName";
      } else if (this.lang == "en") {
        this.nameActivities = "enName";
      }
    },
  },
  async mounted() {
    this.mainActivities = (await axios.get("activities")).data;
    this.activities();
  },
  watch: {
    lang() {
      this.activities();
    },
  },
};
</script>
