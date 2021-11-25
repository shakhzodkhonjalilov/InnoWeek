<template>
  <div class="container">
    <router-link to="/" class="btn btn-light back">Назад</router-link>

    <button
      class="btn__right btn btn-success"
      @click="create"
      :disabled="!valid"
    >
      <span class="material-icons">done</span>
    </button>

    <div class="create">
      <div class="user__icon">
        <span class="material-icons">note_add</span>
      </div>

      <h1 class="text-center text-danger" v-if="error">Ошибка</h1>

      <div class="create__info">
        <v-text-field solo name="name" v-model="name" label="Link документа" />

        <v-row align-center v-for="(user, idx) in users" :key="idx">
          <v-col cols="9">
            <v-text-field
              hide-details
              solo
              label="Введите информацию"
              v-model="user.info"
            />
          </v-col>
          <v-col cols="3">
            <v-switch v-model="user.sign" label="Подписан" />
          </v-col>
        </v-row>

        <div class="text-center">
          <button class="btn btn-success btn__add" @click="addInput">
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>

      <vue-editor v-model="content"></vue-editor>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  data() {
    return {
      name: "",
      content: "",
      users: [
        {
          info: "",
          sign: false
        },
        {
          info: "",
          sign: false
        }
      ],
      error: false
    };
  },
  computed: {
    valid() {
      return this.name.length > 3;
    }
  },
  methods: {
    async create() {
      const newAgreement = {
        link: this.name.toLowerCase(),
        document: this.content,
        users: this.users
      };
      try {
        await this.$store.dispatch("agreement/createAgreement", newAgreement);
        this.$router.push("/");
      } catch (error) {
        this.error = true;
      }
    },
    addInput() {
      this.users.push({ info: "", sign: false });
    }
  },
  beforeDestroy() {
    this.$store.commit("agreement/removeAgreement");
  }
};
</script>

<style lang="scss">
.create {
  padding: 15px 0 30px;
}
</style>
