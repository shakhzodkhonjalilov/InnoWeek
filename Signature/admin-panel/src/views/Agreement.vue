<template>
  <v-container>
    <router-link to="/" class="btn btn-light back">Назад</router-link>

    <div class="loader" v-if="!agreement.link">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="user" v-else>
      <div class="user__icon">
        <span class="material-icons">description</span>
      </div>
      <h3 class="user__name">{{ agreement.link }}</h3>

      <div class="information">
        <div class="information__block">
          <strong>Users:</strong>
          <div class="information__list">
            <div
              class="d-flex justify-content-between"
              v-for="(users, index) in agreement.users"
              :key="index"
            >
              <span>{{ users.info }}</span>
              <span>{{ users.sign ? "Подписан" : "Не подписан" }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="document" v-html="agreement.document"></div>

      <router-link :to="edit" class="btn__right btn btn-info">
        <span class="material-icons">launch</span>
      </router-link>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      agreement: state => state.agreement.agreement
    }),
    edit() {
      return "/edit/" + this.$route.params.id;
    }
  },
  methods: {
    getAgreement() {
      this.$store.dispatch("agreement/getAgreement", this.$route.params.id);
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

<style lang="scss">
</style>
