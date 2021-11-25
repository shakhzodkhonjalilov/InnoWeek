const Help = {
  data() {
    return {
      reqRules: [v => !!v || ""],
      emailRules: [v => !!v || "", v => /.+@.+\..+/.test(v) || ""],
      error: false,
      errorText: "",
      support: false,
    };
  },
  computed: {
    curLang() {
      return this.$parent.$parent.curLang;
    },
  },
  methods: {
    supportHandler() {
      this.support = true;
    },
  },
};

export default Help;
