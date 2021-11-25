<template>
  <div class="container">
    <h1 class="text-center">Документы</h1>

    <div class="loader" v-if="!agreements.length">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div v-for="agreement in agreements" :key="agreement.id">
        <router-link :to="'agreement/' + agreement.link">
          <Agreement :name="agreement.link" />
        </router-link>
      </div>
    </div>

    <router-link to="/create" class="add btn btn-primary">
      <span class="material-icons">add</span>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Agreement from "@/components/Agreement";

export default {
  components: {
    Agreement
  },
  computed: {
    ...mapState({
      agreements: state => state.list.agreements
    })
  },
  methods: {
    ...mapActions({
      getAgreements: "list/getAgreements"
    })
  },
  mounted() {
    try {
      this.getAgreements();
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
