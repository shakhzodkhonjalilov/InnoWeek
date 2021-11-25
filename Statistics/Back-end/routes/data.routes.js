const { Router } = require("express");
const Inputs = require("../models/inputs");
const Show = require("../models/Show");
const Participant = require("../models/participant");
const Language = require("../models/language");
const router = Router();

router.get("/getData", async (req, res) => {
  const inputs = await Inputs.find({}, { _id: 0 });
  const show = await Show.find({}).sort({ value: -1 });
  const participant = await Participant.find({}).sort({ value: -1 });
  const language = await Language.find({}).sort({ value: -1 });

  const data = {
    inputs,
    show,
    participant,
    language,
  };
  res.json(data);
});

router.post("/insertInput", async (req, res) => {
  const { name, value } = req.body;
  await Inputs.findOneAndUpdate({ name }, { value });
  res.json({ ok: 1 });
});

router.post("/insertData", async (req, res) => {
  const data = req.body.data;
  const col = req.body.col;
  const collection =
    col == "Show" ? Show : col == "Participant" ? Participant : Language;

  let promiseArr = [];
  try {
    data.forEach((item) => promiseArr.push(runUpdate(collection, item)));
    Promise.all(promiseArr)
      .then((result) => {
        res.json({ data: data.sort((a, b) => b.value - a.value) });
      })
      .catch((e) => res.status(400));
  } catch (error) {
    res.status(400);
  }
});

function runUpdate(Schema, item) {
  return new Promise((resolve, reject) => {
    Schema.findOneAndUpdate(
      { _id: item._id },
      { name: item.name, value: item.value }
    )
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

module.exports = router;
