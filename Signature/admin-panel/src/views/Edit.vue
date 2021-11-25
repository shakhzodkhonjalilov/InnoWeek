<template>
  <div class="container" v-if="agreement">
    <router-link
      :to="'/agreement/' + this.$route.params.id"
      class="btn btn-light back"
      >Назад</router-link
    >

    <div class="loader" v-if="!agreement.link">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="edit" v-else>
      <div class="user__icon">
        <span class="material-icons">description</span>
      </div>

      <v-text-field
        solo
        name="name"
        v-model="agreement.link"
        label="Link документа"
      />

      <v-row align-center v-for="(user, idx) in agreement.users" :key="idx">
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

      <vue-editor v-model="agreement.document"></vue-editor>

      <button class="btn__delete btn btn-danger" @click="deleteHandler">
        <span class="material-icons">delete</span>
      </button>

      <button
        class="btn__right btn btn-success"
        @click="editHandler"
        :disabled="invalid"
      >
        <span class="material-icons">done</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapState({
      agreement: state => state.agreement.agreement
    }),
    invalid() {
      return this.agreement.link.length < 3;
    }
  },
  methods: {
    getAgreement() {
      this.$store.dispatch("agreement/getAgreement", this.$route.params.id);
    },
    async editHandler() {
      console.log(this.agreement.users);
      const editAgreement = {
        link: this.agreement.link.toLowerCase(),
        document: this.agreement.document,
        users: this.agreement.users,
        _id: this.agreement._id
      };

      try {
        await this.$store.dispatch("agreement/editAgreement", editAgreement);
        this.$router.push(`/`);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteHandler() {
      await this.$store.dispatch(
        "agreement/rmAgreement",
        this.$route.params.id
      );
      this.$router.push("/");
    },
    addInput() {
      this.agreement.users.push({ info: "", sign: false });
    }
  },
  mounted() {
    this.getAgreement();
  },
  beforeDestroy() {
    this.$store.commit("agreement/removeAgreement");
  }
};
</script>

<style>
.btn__delete {
  position: absolute;
  top: 10px;
  right: 70px;
  height: 38px;
}
</style>
