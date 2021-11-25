<template>
  <div class="home container" v-if="document">
    <div class="document__container" ref="agreement">
      <div class="document" v-html="document.document"></div>

      <div class="signature">
        <div
          class="signature__block"
          v-for="(user, idx) in document.users"
          :key="idx"
        >
          <h3
            :class="{
              small: user.info.length < 10,
              middle: user.info.length > 10 && user.info.length < 25,
              big: user.info.length >= 25
            }"
            v-html="user.info"
          ></h3>
        </div>
      </div>

      <div class="signature">
        <div
          class="signature__qrcode"
          v-for="(user, idx) in document.users"
          :key="user.info"
        >
          <button
            class="btn btn-outline-success"
            v-if="!document.users[idx].sign"
            @click="signatureHandler(idx)"
          >
            {{ signature }}
          </button>

          <canvas
            class="canvas"
            v-show="document.users[idx].sign"
            :class="`sign-${idx}`"
          ></canvas>
        </div>
      </div>
    </div>

    <div class="text-center mt-3" v-if="!pdf">
      <button class="btn btn-lg btn-primary" @click="pdfHandler">
        {{ download }}
      </button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import html2pdf from "html2pdf.js";
import io from "socket.io-client";

const socket = io("https://signature.innoweek.uz");
export default {
  name: "Home",
  data() {
    return {
      document: ""
    };
  },
  computed: {
    documentLink() {
      return this.$route.params.id;
    },
    pdf() {
      return this.document.users.filter(el => !el.sign).length;
    },
    signature() {
      let lang = localStorage.getItem("language") || "ru";
      return lang == "ru" ? "Подписать" : lang == "en" ? "Signature" : "Imzo";
    },
    download() {
      let lang = localStorage.getItem("language") || "ru";
      return lang == "ru"
        ? "Скачать PDF"
        : lang == "en"
        ? "Download PDF"
        : "PDF-ni yuklab olish";
    }
  },
  methods: {
    async fetchDocument() {
      const res = await this.$axios.get(`document/${this.documentLink}`);
      const doc = await res.data[0];
      this.document = await doc;
      console.log(this.document);
      this.qrHandler();
    },
    signatureHandler(id) {
      const document = this.documentLink;
      socket.emit("show", { document, id });
    },
    pdfHandler() {
      let agreement = this.$refs.agreement;
      let opt = {
        margin: [0.46, 0],
        filename: "Memorandum.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, scrollX: 0, scrollY: 0 },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait"
        }
      };
      html2pdf()
        .from(agreement)
        .set(opt)
        .save();
    },
    qrHandler() {
      setTimeout(() => {
        this.document.users.map((el, id) => {
          let block = document.querySelector(`.sign-${id}`);
          let text = el.info.split("<span>").reverse()[0];
          text = text.replace("</span>", "");
          QRCode.toCanvas(block, text, { version: 5 }, function(error) {
            if (error) console.error(error);
          });
        });
      }, 0);
    }
  },
  mounted() {
    socket.on("click", data => {
      if (data.document === this.documentLink) {
        console.log(data);
        this.document.users[data.id].sign = true;
        this.$axios.post("document/sign", {
          link: this.documentLink,
          info: this.document.users[data.id].info
        });
      }
    });
    this.fetchDocument();
  }
};
</script>
