<template>
  <div class="application__block">
    <div class="application__title">{{ standData.title }}</div>

    <v-row class="stands" justify="center" :class="{active: activeType}">
      <v-col sm="6" md="4" cols="12" v-for="stand in stands" :key="stand.id">
        <div class="stands__item">
          <div
            class="stands__type"
            :class="{active: stand.id === user.standType}"
            @click="typeHandler(stand)"
          >
            <img :src="pathImg(stand.img)" alt />
          </div>

          <div class="stands__colors" :class="{active: activeType}">
            <div
              v-for="item in stand.colors"
              class="btn"
              :class="{active: item.color === user.mainColor}"
              :key="item.color"
              :style="{ backgroundColor: item.color }"
              @click="colorHandler(item, stand,)"
            />
          </div>

          <button type="button" class="stands__zoom" @click="zoom(stand.img)">{{ standData.btn }}</button>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="auto">
      <div class="big__img">
        <v-btn icon class="big__img-close" @click="dialog = false">&times;</v-btn>
        <img v-if="zoomImg" :src="pathZoom(zoomImg)" />
        <div v-else class="big__img-loader">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    standData() {
      return this.$store.getters.appStand;
    },
  },
  data() {
    return {
      stands: [
        {
          id: 434,
          name: "Тип стенда №1",
          img: "1-1.jpg",
          colors: [
            { color: "#2E8B9C", img: "1-1.jpg" },
            { color: "#D51702", img: "1-2.jpg" },
            { color: "#980BBB", img: "1-3.jpg" },
          ],
        },
        {
          id: 435,
          name: "Тип стенда №2",
          img: "2-1.jpg",
          colors: [
            { color: "#0D1475", img: "2-1.jpg" },
            { color: "#7D0702", img: "2-2.jpg" },
            { color: "#0F752A", img: "2-3.jpg" },
          ],
        },
        {
          id: 436,
          name: "Тип стенда №3",
          img: "3-1.jpg",
          colors: [
            { color: "#370475", img: "3-1.jpg" },
            { color: "#006234", img: "3-2.jpg" },
            { color: "#BD0300", img: "3-3.jpg" },
          ],
        },
      ],
      dialog: false,
      zoomImg: "1-1.jpg",
      activeType: false,
      user: {
        standType: "",
        mainColor: "",
      },
    };
  },
  methods: {
    zoom(img) {
      this.zoomImg = img;
      this.dialog = true;
    },
    pathZoom(img) {
      return require(`@/assets/images/stands/zoom/${img}`);
    },
    pathImg(img) {
      return require(`@/assets/images/stands/${img}`);
    },
    typeHandler(stand) {
      this.zoomImg = "";
      this.activeType = true;
      this.user.standType = stand.id;
      const colorID = stand.img.charAt(2) - 1;
      this.user.mainColor = stand.colors[colorID].color;
    },
    colorHandler(item, stand) {
      this.zoomImg = "";
      this.activeType = true;
      this.user.standType = stand.id;
      this.user.mainColor = item.color;
      stand.img = item.img;
    },
  },
  watch: {
    user: {
      handler(val) {
        this.$store.dispatch("setUser", val);
      },
      deep: true,
    },
  },
};
</script>
