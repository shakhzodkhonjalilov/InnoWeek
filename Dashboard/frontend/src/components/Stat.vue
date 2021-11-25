<template>
  <div v-if="topInputs" class="stat">
    <h1 class="title">
      {{ text.title }}
      <span v-if="dateNow">{{ dateNow }}</span>
    </h1>
    <div class="container">
      <div class="stat__container">
        <div class="stat__container-card">
          <Card
            v-for="inp in topInputs"
            :key="inp._id"
            :input="inp"
            :lang="lang"
          />
        </div>
        <div class="stat__container-diagram" v-if="show.length">
          <Diagram :diagram-data="show" :lang="lang">
            <template v-slot:title>
              <div class="stat__diagram-title">{{ text.show }}</div>
            </template>
            <template v-slot:content>
              <div class="stat__diagram-center">
                {{ count_participant }}
                <br />
                <p v-html="text.country"></p>
              </div>
            </template>
          </Diagram>
        </div>

        <div class="stat__container-diagram" v-if="participant.length">
          <Diagram :diagram-data="participant" class="right" :lang="lang">
            <template v-slot:title>
              <div class="stat__diagram-title">{{ text.participant }}</div>
            </template>
            <template v-slot:content>
              <div class="stat__diagram-center">
                {{ middleInputs[0].value }}
                <br />
                <p v-html="text.views"></p>
              </div>
            </template>
          </Diagram>
        </div>

        <div class="stat__container-card">
          <Card
            v-for="inp in middleInputs"
            :key="inp._id"
            :input="inp"
            :lang="lang"
          />
        </div>
      </div>

      <div class="stat__container">
        <div class="stat__container-card bottom">
          <div v-for="inp in bottomInputs" :key="inp._id">
            <Card :input="inp" :lang="lang" />
          </div>
        </div>
        <div class="stat__container-diagram">
          <Bar :bar-data="language" :lang="lang">
            <template v-slot:title>
              <div class="stat__diagram-title">{{ text.languages }}</div>
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
import Language from "@/static/language";
export default {
  components: { Card, Diagram, Bar },
  data() {
    return {
      topInputs: [],
      middleInputs: [],
      bottomInputs: [],
      count_participant: 0,
      dateNow: null,
      show: [],
      participant: [],
      language: []
    };
  },
  computed: {
    lang() {
      let lang = this.$route.params.id;
      if (!lang) {
        lang = "ru";
      }
      return lang;
    },
    text() {
      return Language[this.lang];
    }
  },
  methods: {
    async getStatics() {
      try {
        const data = await this.$axios.get("getData");
        const res = await data.data;
        this.show = res.show;
        this.participant = res.participant;
        this.language = res.language;

        this.topInputs = [];
        this.middleInputs = [];
        this.bottomInputs = [];
        this.count_participant = [];

        res.inputs.forEach((inp, idx) => {
          let img = idx < 8 ? idx + 1 : 1;
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
            this.bottomInputs.push(input);
          } else {
            this.count_participant = input.value;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    getDate() {
      let date = new Date().toLocaleDateString();
      let time = new Date().toLocaleTimeString().substring(0, 5);
      this.dateNow = `${time} / ${date}`;
    }
  },
  mounted() {
    this.getStatics();
    this.getDate();
    setInterval(() => {
      this.getDate();
      this.getStatics();
    }, 60000);
  }
};
</script>
