<template>
  <div class="stat__diagram">
    <slot name="title"></slot>

    <div class="stat__diagram-content">
      <div class="chart">
        <slot name="content"></slot>
        <DoughnutChart :chart-data="datacollection" />
      </div>
      <ul>
        <li v-for="item in list" :key="item._id">
          <span :style="{ backgroundColor: item.color }"></span>
          <div class="stat__diagram-val">{{ item.value }}</div>
          <div class="stat__diagram-name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "../chart/DoughnutChart.js";

export default {
  props: { diagramData: Array, lang: String },
  components: { DoughnutChart },
  data() {
    return {
      colors: ["#00E2C4", "#FFF600", "#C721C5", "#07DE11", "#E02121"]
    };
  },
  computed: {
    datacollection() {
      let val = [];
      let label = [];
      this.diagramData.map(el => {
        val.push(el.value);
        label.push(el.name);
      });
      return {
        datasets: [
          {
            data: val,
            backgroundColor: this.colors,
            borderWidth: [0, 0, 0, 0, 0]
          }
        ],
        labels: label
      };
    },
    list() {
      return this.diagramData.map((el, idx) => {
        let val = el.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let name =
          this.lang === "ru" ? "name" : this.lang == "en" ? "nameEn" : "nameUz";
        return {
          color: this.colors[idx],
          value: val,
          name: el[name]
        };
      });
    }
  },
  methods: {
    moneyRef(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
};
</script>
