<template>
  <div v-if="topInputs" class="stat">
    <h1 class="title">Итоги InnoWeek 2020 на {{ dateNow }}</h1>
    <div class="container">
      <div class="stat__container">
        <div class="stat__container-card">
          <Card v-for="inp in topInputs" :key="inp._id" :input="inp" />
        </div>
        <div class="stat__container-diagram" v-if="show.length">
          <Diagram :diagram-data="show">
            <template v-slot:title>
              <div class="stat__diagram-title">ТОП-5 по Кол-ву участников выставки по странам</div>
            </template>
            <template v-slot:content>
              <div class="stat__diagram-center">
                {{ count_participant }}
                <br />
                <p>
                  Стран
                  <br />участников
                </p>
              </div>
            </template>
          </Diagram>
        </div>

        <div class="stat__container-diagram" v-if="participant.length">
          <Diagram :diagram-data="participant" class="right">
            <template v-slot:title>
              <div class="stat__diagram-title">ТОП-5 по Кол-ву участников выставки по странам</div>
            </template>
            <template v-slot:content>
              <div class="stat__diagram-center">
                {{ middleInputs[0].value }}
                <br />
                <p>
                  Посетителей
                  <br />выставки
                </p>
              </div>
            </template>
          </Diagram>
        </div>

        <div class="stat__container-card">
          <Card v-for="inp in middleInputs" :key="inp._id" :input="inp" />
        </div>
      </div>

      <div class="stat__container">
        <div class="stat__container-card bottom">
          <div v-for="inp in bottomInputs" :key="inp._id">
            <Card :input="inp" />
          </div>
        </div>
        <div class="stat__container-diagram">
          <Bar :bar-data="language">
            <template v-slot:title>
              <div class="stat__diagram-title">Количество посетителей выставки по языкам</div>
            </template>
          </Bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import Diagram from "./Diagram";
import Bar from "./Bar";
export default {
  components: { Card, Diagram, Bar },
  data() {
    return {
      topInputs: [],
      middleInputs: [],
      bottomInputs: [],
      count_participant: 0,
      dateNow: "13:00 / 07.11.20",
      show: [],
      participant: [],
      language: []
    };
  },
  computed: {},
  methods: {
    async getStatics() {
      const data = await fetch("http://localhost:5001/api/getData");
      const res = await data.json();
      this.show = res.show;
      this.participant = res.participant;
      this.language = res.language;

      res.inputs.forEach((inp, idx) => {
        let img = idx < 7 ? idx + 1 : 1;
        let input = {
          icon: require(`@/assets/images/icon-${img}.png`),
          label: inp.label,
          value: inp.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        };
        if (idx < 3) {
          this.topInputs.push(input);
        } else if (idx < 6) {
          this.middleInputs.push(input);
        } else if (idx == 6) {
          this.bottomInputs.push(input);
        } else if (idx == 7) {
          this.bottomInputs.push(inp);
        } else {
          this.count_participant = input.value;
        }
      });
    }
  },
  mounted() {
    this.getStatics();
  }
};
</script>
