<template>
  <div class="rating">
    <div class="container">
      <div class="rating__top">
        <a href="/" class="logo">
          <img src="@/assets/logo-white.png" alt="" />
        </a>
      </div>

      <div class="text-center mb-3">
        <h1 class="text-danger">Voting is over!</h1>
      </div>

      <div class="rating__search">
        <input
          type="text"
          name="serach"
          v-model="search"
          @input="onSearchStand()"
        />
      </div>
      <div v-if="!error">
        <ul class="rating__list">
          <li
            class="rating__list-stand"
            v-for="(stand, idx) in stands"
            :key="idx"
          >
            <span>{{ stand.name }}</span>
            <div class="rating__like">
              <span class="mr-3">{{ stand.likes }}</span>
              <!-- <a
                href="#"
                class="like_img"
                @click.prevent="onLikeStand(stand)"
                v-if="!stand.liked"
              >
                <img src="@/assets/like.svg" alt="" />
              </a> -->
              <span class="like_img">
                <img src="@/assets/liked.svg" alt="" />
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div class="text-center" v-else>
        <h1 class="text-danger">You must be logged in to access this page</h1>
      </div>

      <notifications width="190" position="bottom center" group="foo" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: [],
      stands: [],
      search: "",
      error: false
    };
  },
  methods: {
    async getRating() {
      try {
        let token = sessionStorage.getItem("token");
        let res = await this.$axios(
          "https://show.innoweek.uz/api/stand/like-list",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${token}`
            }
          }
        );
        this.rating = await res.data.data;
        this.stands = this.rating;
      } catch (error) {
        this.error = true;
      }
    },
    onSearchStand() {
      this.stands = this.rating.filter(stand => {
        return stand.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    async onLikeStand(stand) {
      try {
        let token = sessionStorage.getItem("token");
        await this.$axios.post(
          "https://show.innoweek.uz/api/stand/like",
          {
            name: stand.name,
            like: true
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${token}`
            }
          }
        );
        this.getRating();
        this.$notify({
          group: "foo",
          type: "success",
          title: "Successfully"
        });
      } catch (error) {
        this.error = true;
      }
    }
  },
  mounted() {
    this.getRating();
  }
};
</script>
