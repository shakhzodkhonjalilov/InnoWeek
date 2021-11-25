<template>
  <div class="stat__diagram">
    <slot name="title"></slot>

    <div class="stat__diagram-content">
      <slot name="content"></slot>
      <div class="chart">
        <DoughnutChart :chart-data="datacollection" />
      </div>
      <ul>
        <li v-for="(item, idx) in diagramData" :key="item._id">
          <span :style="{ backgroundColor: colors[idx] }"></span>
          <div class="stat__diagram-val">{{ moneyRef(item.value) }}</div>
          <div class="stat__diagram-name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "../chart/DoughnutChart.js";

export default {
  props: { diagramData: Array },
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
    }
  },
  methods: {
    moneyRef(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
};
</script>
