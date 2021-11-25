const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Innoview = require("../models/Innoview");
const Views = require("../models/Views");
const router = Router();

function procent(num, len) {
  return Math.round((num / len) * 100) + "%";
}

router.get("/statics", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://185.211.129.125:53081");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const users = await User.find({}, { _id: 0, password: 0 });
  const views = await Views.find({});
  const innoview = await Innoview.find({});

  let male = 0;
  let female = 0;
  let ru = 0;
  let uz = 0;
  let en = 0;
  let countriesView = {};
  const countries = [
    ...new Set(
      users.map(user => {
        if (countriesView[user.country]) {
          countriesView[user.country] += 1;
        } else {
          countriesView[user.country] = 1;
        }
        user.gender === "male" ? male++ : female++;
        user.language === "ru" ? ru++ : user.language === "uz" ? uz++ : en++;
        return user.country;
      })
    ),
  ].length;

  const age =
    users.reduce((acc, cur) => {
      return acc + (new Date().getFullYear() - cur.born);
    }, 0) / users.length;

  let maleProcent = procent(male, users.length);
  let femaleProcent = procent(female, users.length);
  const gender = `Мужчин: ${male} - ${maleProcent} <br /> Женщин: ${female} - ${femaleProcent}`;

  countriesView = Object.keys(countriesView)
    .sort((a, b) => {
      return countriesView[b] - countriesView[a];
    })
    .map(el => {
      return `${el}: ${countriesView[el]} - ${procent(
        countriesView[el],
        users.length
      )} <br />`;
    })
    .join("");

  let ruProcent = procent(ru, users.length);
  let uzProcent = procent(uz, users.length);
  let enProcent = procent(en, users.length);
  const language = `Русский язык: ${ru} - ${ruProcent} <br /> Узбекский язык: ${uz} - ${uzProcent} <br /> Английский язык: ${en} - ${enProcent}`;

  const data = {
    users: users.length,
    views: views[0].views,
    innoview: innoview[0].views,
    countries,
    age: parseInt(age),
    gender,
    countriesView,
    language,
  };
  res.json(data);
});

router.get("/user", auth, async (req, res) => {
  try {
    res.json({
      id: req.user.userId,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get("/innoview", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://innoweek.uz");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await Innoview.findOneAndUpdate(
    {},
    {
      $inc: {
        views: 1,
      },
    }
  );
  res.json({
    ok: 1,
  });
});

module.exports = router;
