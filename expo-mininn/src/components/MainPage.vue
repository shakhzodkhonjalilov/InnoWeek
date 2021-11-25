<template>
  <div>
    <header class="main__header">
      <v-container>
        <ul class="main__languages">
          <li v-for="lang in languages" :key="lang.name">
            <v-btn
              text
              class="main__lang"
              :class="{active: lang.name == curLang}"
              @click="changeLang(lang.name)"
            >{{lang.title}}</v-btn>
          </li>
        </ul>
      </v-container>
    </header>
    <v-main>
      <v-container>
        <vue-headful title="Заявка на стартап" />
        <v-snackbar v-model="inval" :timeout="timeout" centered color="pink lighten-1">
          Форма заполнена некорректно
          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="inval = false">Закрыть</v-btn>
          </template>
        </v-snackbar>
        <v-snackbar v-model="error" :timeout="timeout" centered color="pink lighten-1">
          Ошибка сервера
          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="error = false">Закрыть</v-btn>
          </template>
        </v-snackbar>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submitForm"
          accept-charset="UTF-8"
        >
          <v-card flat>
            <v-row class="text-center">
              <v-col class="mb-4">
                <h2 class="display-2 mb-3">{{info.title}}</h2>
                <v-col md="10" offset-md="1">
                  <v-checkbox v-model="infoForWork" :rules="[rulesReq]" required>
                    <template v-slot:label>
                      <a target="_blank" :href="lex" @click.stop>{{info.rules[0]}}</a>
                    </template>
                  </v-checkbox>
                  <v-checkbox
                    v-model="infoForWorkMinister"
                    :label="info.rules[1]"
                    :rules="[rulesReq]"
                    required
                  />
                  <v-checkbox
                    v-model="infoForWorkSupport"
                    :label="info.rules[2]"
                    :rules="[rulesReq]"
                    required
                  />
                </v-col>
                <h2>{{info.appTitle}}</h2>
                <v-col md="10" offset-md="1">
                  <v-text-field
                    v-model="projectName"
                    :label="info.projectName"
                    maxlength="200"
                    counter
                    required
                    outlined
                    :rules="[rulesReq]"
                  />
                  <v-text-field
                    v-model="declarantFullName"
                    :label="info.declarantFullName"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                  <v-row>
                    <v-col>
                      <v-text-field
                        type="tel"
                        v-model="phone"
                        :label="info.phone"
                        outlined
                        required
                        :rules="[rulesReq]"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="email"
                        :label="info.email"
                        outlined
                        required
                        :rules="[emailRules]"
                      />
                    </v-col>
                  </v-row>
                  <v-select
                    v-model="sex"
                    :label="info.sex.label"
                    :items="info.sex.items"
                    item-text="label"
                    item-value="val"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                  <v-text-field
                    v-model="funds"
                    @input="strReplace"
                    type="tel"
                    :label="info.funds.label"
                    :hint="info.funds.hint"
                    persistent-hint
                    outlined
                    required
                    :rules="[rulesFin]"
                  />
                  <hr />
                  <br />
                </v-col>

                <h2>{{info.declarantTitle}}</h2>
                <p class="text-center">{{info.declarantChoose}}</p>
                <v-col md="6" offset-md="3">
                  <v-select
                    v-model="declarantTypeId"
                    :items="personTypes"
                    :item-text="locName"
                    item-value="id"
                    :label="info.declarantType"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                </v-col>

                <v-col md="8" offset-md="2" v-if="declarantTypeId">
                  <template v-if="declarantTypeId===294">
                    <v-text-field
                      v-model="inn"
                      :label="info.inn"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <v-text-field
                      v-model="passport"
                      :label="info.passport"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <v-select
                      v-model="indivRegionId"
                      :label="info.indivRegion"
                      :items="regions"
                      :item-text="locName"
                      item-value="id"
                      validate-on-blur
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <p align="start">{{info.indivFiles}}</p>
                    <v-file-input
                      class="main__file-down"
                      @change="indivFile($event)"
                      ref="indivFile"
                      :label="info.filesLabel"
                      accept=".pdf, .jpg"
                      outlined
                      required
                      :rules="[indivRules]"
                    />

                    <div v-if="indivFiles.length">
                      <strong class="text-center">{{info.downFiles}}</strong>
                      <ul class="main__file-list">
                        <li v-for="(file, index) in indivFiles" :key="index">
                          <span>{{ file.name }}</span>
                          <v-btn icon @click="rmIndivFile(index, 'indivFile')">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template v-else-if="declarantTypeId===295">
                    <v-text-field
                      v-model="company"
                      :label="info.company"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <v-text-field
                      v-model="mainActivity"
                      :label="info.mainActivity.label"
                      :hint="info.mainActivity.hint"
                      persistent-hint
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <v-text-field
                      v-model="companyHeadFullName"
                      :label="info.companyHeadFullName"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <v-select
                      v-model="compRegionId"
                      :label="info.compRegion"
                      :items="regions"
                      :item-text="locName"
                      item-value="id"
                      validate-on-blur
                      outlined
                      required
                      :rules="[rulesReq]"
                    />

                    <p align="start">{{info.compFiles}}</p>
                    <v-file-input
                      class="main__file-down"
                      @change="compFile($event)"
                      ref="compFile"
                      :label="info.filesLabel"
                      outlined
                      required
                      accept=".pdf, .jpg"
                      :rules="[compRules]"
                    />
                    <div v-if="compFiles.length">
                      <ul class="main__file-list">
                        <div class="text-center">{{info.downFiles}}</div>
                        <li v-for="(file, index) in compFiles" :key="index">
                          <span>{{ file.name }}</span>
                          <v-btn icon @click="rmCompFile(index)">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-col>
                <hr />
                <br />

                <h2 class="text-center">{{info.infoTitle}}</h2>

                <v-col md="6" offset-md="3">
                  <v-select
                    v-model="scopeId"
                    :label="info.scope"
                    :items="scopesTypes"
                    :item-text="locName"
                    item-value="id"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                </v-col>

                <v-col md="10" offset-md="1">
                  <v-textarea
                    v-model="content"
                    :label="info.content"
                    name="input-7-4"
                    maxlength="1000"
                    counter
                    validate-on-blur
                    outlined
                    required
                    :rules="[contentRules]"
                  />
                  <v-textarea
                    v-model="annotation"
                    :label="info.annotation"
                    name="input-7-4"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                  <v-col md="6" offset-md="3">
                    <v-select
                      v-model="stageId"
                      :label="info.stage"
                      :items="stagesProjectTypes"
                      :item-text="locName"
                      item-value="id"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />
                  </v-col>
                  <div>
                    <div align="start">
                      {{info.startDate}}
                      <v-select
                        class="payback__inp"
                        v-model="startDate"
                        :items="years"
                        outlined
                        required
                        :rules="rulesReqEmp"
                      />
                      {{info.endDate}}
                      <v-select
                        class="payback__inp"
                        v-model="endDate"
                        :items="toYears"
                        outlined
                        required
                        :rules="rulesReqEmp"
                      />
                      {{info.year}}
                    </div>
                    <div align="start">
                      {{info.payBack}}
                      <v-select
                        class="payback__inp"
                        v-model="paybackDate"
                        :items="years"
                        outlined
                        required
                        :rules="rulesReqEmp"
                      />
                      {{info.years}}
                    </div>
                  </div>
                  <v-text-field
                    v-model="keyword"
                    :label="info.keyword"
                    outlined
                    required
                    :rules="[rulesReq]"
                  />
                </v-col>
                <hr />
                <br />

                <h2 class="text-center">{{info.perTitle}}</h2>
                <v-col md="8" offset-md="2">
                  <p>{{info.perSubTitle}}</p>
                  <div v-for="(per,idx) in persons" :key="idx">
                    <h3>{{idx+1}} {{info.per}}</h3>
                    <v-text-field
                      v-model="per.fullName"
                      :label="info.perName"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />
                    <template>
                      <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="per.bday"
                            :label="info.perBday"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rulesReq]"
                          />
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="per.bday"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                        />
                      </v-menu>
                    </template>
                    <v-text-field
                      v-model="per.phone"
                      :label="info.phone"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />
                    <v-text-field
                      v-model="per.education"
                      :label="info.perEdu"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />
                    <v-text-field
                      v-model="per.role"
                      :label="info.perRole"
                      outlined
                      required
                      :rules="[rulesReq]"
                    />
                    <div v-if="idx !== 0">
                      <v-btn class="mb-4" outlined color="red" @click="rmPerson(idx)">{{info.perRm}}</v-btn>
                    </div>
                  </div>
                  <div class="my-2">
                    <v-btn outlined large color="primary" @click="addPersons">{{info.perAdd}}</v-btn>
                  </div>
                </v-col>
                <hr />
                <br />

                <v-col md="8" offset-md="2">
                  <h2 class="text-center mb-2">{{info.finTitle}}</h2>
                  <p class="text-center">{{info.finSubTitle}}</p>

                  <v-col class="my-2">
                    <a style="text-decoration: none" :href="finExpamle">
                      <v-btn large outlined color="primary">{{info.downSample}}</v-btn>
                    </a>
                  </v-col>

                  <div>
                    <p align="start">{{info.finFile}}</p>
                    <v-file-input
                      @change="finTable($event)"
                      ref="finTable"
                      class="main__file-down"
                      :label="info.fileLabel"
                      outlined
                      required
                      accept=".xlsx"
                      :rules="[finRules]"
                    />
                    <div v-if="financialTable">
                      <strong class="text-center">{{info.downFiles}}</strong>
                      <ul class="main__file-list">
                        <li>
                          <span>{{ financialTable.name }}</span>
                          <v-btn icon @click="remFile('finTable')">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="my-4">
                    <p align="start">{{info.finScan}}</p>
                    <v-file-input
                      class="main__file-down"
                      @change="finScan($event)"
                      ref="finScan"
                      :label="info.fileLabel"
                      accept=".pdf"
                      outlined
                      required
                      :rules="[finScanRules]"
                    />

                    <div v-if="financialScan">
                      <strong class="text-center">{{info.downFiles}}</strong>
                      <ul class="main__file-list">
                        <li>
                          <span>{{ financialScan.name }}</span>
                          <v-btn icon @click="remFile('finScan')">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <h2 class="text-center mb-2">{{info.busTitle}}</h2>
                  <p>{{info.busSubTitle[0]}}</p>
                  <p>{{info.busSubTitle[1]}}</p>
                  <v-col class="my-2">
                    <a style="text-decoration: none" download :href="requireFile">
                      <v-btn outlined large color="primary">{{info.downSample}}</v-btn>
                    </a>
                  </v-col>

                  <div>
                    <p align="start">{{info.busPlan}}</p>
                    <v-file-input
                      @change="busFile($event)"
                      ref="busPlan"
                      class="main__file-down"
                      :label="info.fileLabel"
                      accept=".docx"
                      outlined
                      required
                      :rules="[busRules]"
                    />

                    <div v-if="businessPlan">
                      <strong class="text-center">{{info.downFiles}}</strong>
                      <ul class="main__file-list">
                        <li>
                          <span>{{ businessPlan.name }}</span>
                          <v-btn icon @click="remFile('busPlan')">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="mt-4 mb-2">
                    <p align="start">{{info.busScan}}</p>
                    <v-file-input
                      @change="busScan($event)"
                      ref="busScan"
                      class="main__file-down"
                      :label="info.fileLabel"
                      accept=".pdf"
                      outlined
                      required
                      :rules="[busScanRules]"
                    />

                    <div v-if="businessScan">
                      <strong class="text-center">{{info.downFiles}}</strong>
                      <ul class="main__file-list">
                        <li>
                          <span>{{ businessScan.name }}</span>
                          <v-btn icon @click="remFile('busScan')">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <h2 class="text-center mb-2">{{info.commercialTitle}}</h2>
                  <p
                    align="justify"
                    v-for="(item, idx) in info.commercialSubTitle"
                    :key="idx"
                  >{{item}}</p>

                  <div class="mb-2">
                    <p align="start">{{info.commercialFiles}}</p>
                    <v-file-input
                      @change="commerFile($event)"
                      ref="comFile"
                      class="main__file-down"
                      :label="info.filesLabel"
                      accept=".pdf, .jpg"
                      outlined
                      required
                      :rules="[commerRules]"
                    />
                    <div v-if="commercial.length">
                      <ul class="main__file-list">
                        <div class="text-center">{{info.downFiles}}</div>
                        <li v-for="(file, index) in commercial" :key="index">
                          <span>{{ file.name }}</span>
                          <v-btn icon @click="rmComFile(index)">X</v-btn>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <h2 class="text-center mb-2">Дополнительные файлы</h2>
                  <p align="start" v-for="(item) in info.otherText" :key="item">{{item}}</p>
                  <br />

                  <p align="start">{{info.otherFiles}}</p>

                  <v-file-input
                    @change="extraFile($event)"
                    ref="extraFile"
                    class="main__file-down"
                    :label="info.filesLabel"
                    accept=".pdf, .jpg"
                    outlined
                  />

                  <div v-if="optionalFiles.length || optionalFilesErr.length">
                    <strong class="text-center">{{info.downFiles}}</strong>
                    <ul class="main__file-err">
                      <li v-for="(file, idx) in optionalFilesErr" :key="idx">{{file}}</li>
                    </ul>
                    <ul class="main__file-list">
                      <li v-for="(file, index) in optionalFiles" :key="index">
                        <span>{{ file.name }}</span>
                        <v-btn icon @click="rmExtraFile(index)">X</v-btn>
                      </li>
                    </ul>
                  </div>
                  <br />

                  <div class="text-center mb-5" v-if="waiting">
                    <v-progress-circular indeterminate color="primary" />
                    <div class="my-3">{{info.waiting}}</div>
                  </div>
                  <div class="application__procent" v-if="loading">
                    <v-progress-linear :value="loadingProcent" height="25" rounded>
                      <strong>{{ Math.ceil(loadingProcent) }}%</strong>
                    </v-progress-linear>
                  </div>

                  <div v-if="!loading && !waiting">
                    <v-btn
                      class="primary"
                      rounded
                      block
                      x-large
                      type="form"
                      :disabled="disableSub"
                    >{{info.submit}}</v-btn>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-form>

        <v-dialog v-model="success" width="770">
          <div class="main__modal">
            <div class="modal__body">
              <h3>{{this.info.success.title}}</h3>
              <p>{{this.info.success.subTitle}}</p>
              <div class="modal__number">
                {{this.info.success.number}}
                <strong>{{this.successNumber}}</strong>
              </div>
              <p>{{this.info.success.text}}</p>
              <a :href="successLink" target="_blank" class="modal__link">{{this.info.success.check}}</a>
            </div>
          </div>
        </v-dialog>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import mainData from "@/static/mainPage";

export default {
  name: "Startap",
  data: () => ({
    rulesReqEmp: [(v) => !!v || ""],
    languages: [
      { name: "ru", title: "Рус" },
      { name: "uz", title: "ЎЗБ" },
    ],
    curLang: "ru",
    success: false,
    successLink: "http",
    successNumber: null,
    valid: true,
    infoForWork: false,
    infoForWorkMinister: false,
    infoForWorkSupport: false,
    timeout: 15000,
    loading: false,
    waiting: false,
    inval: false,
    error: false,
    disableSub: false,
    lang: "",

    personTypes: [],
    stagesProjectTypes: [],
    scopesTypes: [],

    projectName: "",
    declarantFullName: "",
    phone: "",
    email: "",
    declarantTypeId: null,
    scopeId: "",
    content: "",
    annotation: "",
    keyword: "",
    stageId: "",
    persons: [
      {
        fullName: "",
        bday: "",
        phone: "",
        education: "",
        role: "",
      },
    ],
    inn: "",
    passport: "",
    indivRegionId: "",
    indivFiles: [],
    indivErrFiles: [],
    company: "",
    mainActivity: "",
    compRegionId: "",
    companyHeadFullName: "",
    compFiles: [],
    funds: "",
    sex: "",
    startDate: null,
    endDate: null,
    paybackDate: null,
    financialTable: null,
    financialScan: null,
    businessPlan: null,
    businessScan: null,
    commercial: [],
    optionalFiles: [],
    optionalFilesErr: [],
    currLogoFiles: [],
    loadingProcent: 0,
  }),
  computed: {
    years() {
      return this.getYears();
    },
    toYears() {
      return this.getYears(1);
    },
    info() {
      return mainData[this.curLang];
    },
    requireFile() {
      if (this.curLang == "ru") {
        return `/required/BP-example.docx`;
      }
      return `/required/BP-example_uzb.docx`;
    },
    locName() {
      return this.curLang == "ru" ? "ruName" : "uzName";
    },
    lex() {
      return this.curLang == "ru"
        ? "https://lex.uz/docs/4396428"
        : "https://lex.uz/docs/4396419";
    },
    finExpamle() {
      return this.curLang == "ru"
        ? "/required/FIN-example.xlsx"
        : "/required/FIN-example_uzb.xlsx";
    },
  },
  methods: {
    async submitForm() {
      //todo validate files
      await this.$refs.form.validate();
      if (!this.valid) {
        let fields = this.$refs.form.inputs.filter((el) => el.valid === false);
        window.scrollTo({
          top: fields[0].$el.offsetTop - 50,
          behavior: "smooth",
        });
        this.inval = true;
        return;
      }
      this.loading = true;

      let formData = new FormData();
      formData.append("projectName", this.projectName);
      formData.append("declarantFullName", this.declarantFullName);
      formData.append("sex", this.sex);
      formData.append("phone", this.phone);
      formData.append("email", this.email);
      formData.append("funds", this.funds);
      formData.append("declarantTypeId", this.declarantTypeId);
      formData.append("scopeId", this.scopeId);
      formData.append("stageId", this.stageId);
      formData.append("content", this.content);
      formData.append("annotation", this.annotation);
      formData.append("startDate", `${this.startDate}-12-31`);
      formData.append("endDate", `${this.endDate}-12-31`);
      formData.append("paybackDate", `${this.paybackDate}-12-31`);
      formData.append("keyword", this.keyword);
      if (this.declarantTypeId === 294) {
        formData.append("inn", this.inn);
        formData.append("passport", this.passport);
        formData.append("regionId", this.indivRegionId);
        this.appendFiles(formData, "photoFiles", this.indivFiles);
      } else {
        formData.append("company", this.company);
        formData.append("mainActivity", this.mainActivity);
        formData.append("companyHeadFullName", this.companyHeadFullName);
        formData.append("regionId", this.compRegionId);
        this.appendFiles(formData, "companyIdentityFiles", this.compFiles);
      }

      this.appendFiles(formData, "financialTable", this.financialTable);
      this.appendFiles(formData, "financialTableScan", this.financialScan);
      this.appendFiles(formData, "businessPlan", this.businessPlan);
      this.appendFiles(formData, "businessPlanScan", this.businessScan);
      this.appendFiles(formData, "businessProposalFiles", this.commercial);
      this.appendFiles(formData, "optionalFiles", this.optionalFiles);

      formData.append("persons", JSON.stringify(this.persons));

      if (this.curLang === "ru") {
        formData.append("language", this.lang.data[1].id);
      } else if (this.curLang === "uz") {
        formData.append("language", this.lang.data[0].id);
      }
      try {
        const config = {
          headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
          onUploadProgress: (progressEvent) => {
            this.loadingProcent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            if (this.loadingProcent == 100) {
              this.loading = false;
              this.waiting = true;
            }
          },
        };
        let id = await axios.post("mprequest", formData, config);

        this.loading = false;
        this.waiting = false;
        this.successLink = this.successLink + id.data.split("http")[1];
        this.successNumber = id.data.split(" ")[3];
        this.success = true;
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
    appendFiles(form, name, values) {
      if (Array.isArray(values)) {
        for (let i = 0; i < values.length; i++) {
          form.append(name, values[i], encodeURI(values[i].name));
        }
      } else {
        form.append(name, values, encodeURI(values.name));
      }
    },
    filesValid(value, format, text) {
      if (value.size > 10000000) {
        return this.curLang == "ru"
          ? "Размер не более 10мб"
          : "Ҳажми 10 мб дан ошмаслиги керак";
      } else if (!format.includes(value.type)) {
        return text;
      }
      return true;
    },
    indivFile(val) {
      if (val) {
        let format = ["image/jpeg", "application/pdf"];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.indivFiles = [...this.indivFiles, val];
        }
      }
    },
    indivRules(value) {
      if (this.indivFiles.length && !value) return true;
      let text = this.info.indivFiles;
      let format = ["image/jpeg", "application/pdf"];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    compFile(val) {
      if (val) {
        let format = ["image/jpeg", "application/pdf"];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.compFiles = [...this.compFiles, val];
        }
      }
    },
    compRules(value) {
      if (this.compFiles.length && !value) return true;
      let text = this.info.compFiles;
      let format = ["image/jpeg", "application/pdf"];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    finTable(val) {
      if (val) {
        let format = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.financialTable = val;
        }
      }
    },
    finRules(value) {
      if (this.financialTable && !value) return true;
      let text = this.info.finFile;
      let format = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    finScan(val) {
      if (val) {
        let format = ["application/pdf"];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.financialScan = val;
        }
      }
    },
    finScanRules(value) {
      if (this.financialScan && !value) return true;
      let text =
        this.curLang == "ru"
          ? "Загрузите сканированную версию в формате *.pdf"
          : "*.pdf форматида сканердан ўткан версияни юклаб олинг.";
      let format = ["application/pdf"];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    busFile(val) {
      if (val) {
        let format = [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.businessPlan = val;
        }
      }
    },
    busRules(value) {
      if (this.businessPlan && !value) return true;
      let text = this.info.busPlan;
      let format = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    busScan(val) {
      if (val) {
        let format = ["application/pdf"];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.businessScan = val;
        }
      }
    },
    busScanRules(value) {
      if (this.businessScan && !value) return true;
      let text =
        this.curLang == "ru"
          ? "Загрузите сканированную версию в формате *.pdf"
          : "*.pdf форматида сканердан ўткан версияни юклаб олинг.";
      let format = ["application/pdf"];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    commerFile(val) {
      if (val) {
        let format = ["image/jpeg", "application/pdf"];
        let valid = this.filesValid(val, format, "err");
        if (typeof valid != "string") {
          this.commercial = [...this.commercial, val];
        }
      }
    },
    commerRules(value) {
      if (this.commercial.length && !value) return true;
      let text = this.info.commercialFiles;
      let format = ["image/jpeg", "application/pdf"];
      if (!value) return false;
      return this.filesValid(value, format, text);
    },
    extraFile(val) {
      let text =
        this.curLang == "ru"
          ? "Размер не более 10мб"
          : "Ҳажми 10 мб дан ошмаслиги керак";
      let format = ["image/jpeg", "application/pdf"];
      if (!val) return false;
      if (val.size > 10000000) {
        this.optionalFilesErr = [`${text} ${val.name}`];
        return false;
      } else if (!format.includes(val.type)) {
        this.optionalFilesErr = [`Формат ${val.name} не соответствует`];
        return false;
      }
      this.optionalFilesErr = [];
      this.optionalFiles = [...this.optionalFiles, val];
    },
    rulesReq(value) {
      if (value) return true;
      return this.curLang == "ru"
        ? "Поле обязательное для заполнения"
        : "Тўлдириш учун мажбурий майдон";
    },
    emailRules(value) {
      if (value && /.+@.+\..+/.test(value)) return true;
      else if (this.curLang == "ru") {
        if (value && !/.+@.+\..+/.test(value)) {
          return "Некорректный E-mail";
        }
        return "Поле обязательное для заполнения";
      } else if (this.curLang == "uz") {
        if (value && !/.+@.+\..+/.test(value)) {
          return "Нотўғри E-mail";
        }
        return "Тўлдириш учун мажбурий майдон";
      }
    },
    contentRules(value) {
      if (value == "") {
        return this.curLang == "ru"
          ? "Поле обязательное для заполнения"
          : "Тўлдириш учун мажбурий майдон";
      } else if (value.length < 300) {
        return "Длинна информации должна быть не менее 300 символов";
      }
      return true;
    },
    rulesFin(value) {
      if (value) return true;
      return this.curLang == "ru"
        ? "Данные должны соответствовать бизнес плану и финансовым таблицам. Валюта: UZS (сум)"
        : this.info.funds.hint;
    },

    addPersons() {
      this.persons.push({
        fullName: "",
        bday: "",
        phone: "",
        education: "",
        role: "",
      });
    },
    getYears(val = 0) {
      let start = new Date().getFullYear() + val;
      let end = new Date().getFullYear() + 31;
      let arr = [];
      while (start < end) {
        arr.push(start);
        start++;
      }
      return arr;
    },

    rmIndivFile(id) {
      this.indivFiles = this.indivFiles.filter((el, idx) => idx !== id);
      if (this.indivFiles.length == 0) {
        this.$refs.indivFile.clearableCallback();
      }
    },
    rmCompFile(id) {
      this.compFiles = this.compFiles.filter((el, idx) => idx !== id);
      if (this.compFiles.length == 0) {
        this.$refs.compFile.clearableCallback();
      }
    },
    remFile(file) {
      if (file == "finTable") {
        this.financialTable = null;
      } else if (file == "finScan") {
        this.financialScan = null;
      } else if (file == "busPlan") {
        this.businessPlan = null;
      } else if (file == "busScan") {
        this.businessScan = null;
      }
      this.$refs[file].clearableCallback();
    },
    rmComFile(id) {
      this.commercial = this.commercial.filter((el, idx) => idx !== id);
      if (this.commercial.length == 0) {
        this.$refs.comFile.clearableCallback();
      }
    },
    rmExtraFile(id) {
      this.optionalFiles = this.optionalFiles.filter((el, idx) => idx !== id);
      this.optionalFilesErr = [];
    },
    rmPerson(id) {
      this.persons = this.persons.filter((el, idx) => idx !== id);
    },
    async strReplace() {
      const reg = /\D/g;
      this.funds = await this.funds.replace(reg, "");
    },
    changeLang(lang) {
      this.curLang = lang;
      localStorage.setItem("curLang", lang);
    },
    curLocation() {
      const lang = localStorage.getItem("curLang");
      if (!lang) {
        localStorage.setItem("curLang", "uz");
        this.curLang = "uz";
      } else {
        this.curLang = lang;
      }
    },
  },
  created() {
    this.curLocation();
  },
  async mounted() {
    this.personTypes = (await axios.get("types")).data;
    this.stagesProjectTypes = (await axios.get("stages")).data;
    this.scopesTypes = (await axios.get("scopes")).data;
    this.regions = (await axios.get("regions")).data.sort(
      (a, b) => a.id - b.id
    );
    this.lang = await axios.get("languages");
  },
  watch: {
    valid() {
      this.disableSub = !this.valid;
    },
    curLang() {
      this.$refs.form.resetValidation();
    },
    success(val) {
      if (!val) {
        location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__header {
    border-bottom: 1px solid #eeeeee;
  }
  &__languages {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  &__lang {
    margin-right: 10px;
    border-radius: 20px;
    height: 28px;
    line-height: 28px;
    &.active {
      color: #ffffff;
      background: #160766;
    }
  }
}
</style>
