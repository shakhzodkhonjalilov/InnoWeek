const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Inputs = require('../models/inputs');
const Live = require('../models/live');
const Show = require('../models/show');
const Participant = require('../models/participant');
const Language = require('../models/language');
const router = Router();

router.get('/getData', async (req, res) => {
  const show = await Show.find({}).sort({
    value: -1,
  });
  const participant = await Participant.find({}).sort({
    value: -1,
  });
  const language = await Language.find({}).sort({
    value: -1,
  });

  const value = language.reduce((acc, cur) => acc + cur.value, 0);

  await Inputs.findOneAndUpdate({ name: 'count_visitor' }, { value });
  const inputs = await Inputs.find({}, { _id: 0 });

  const live = await Live.find({});

  const data = {
    inputs,
    show,
    participant,
    language,
    live,
  };
  res.json(data);
});

router.get('/getLive', async (req, res) => {
  const live = await Live.find({});
  res.json(live);
});

router.post('/insertInput', auth, async (req, res) => {
  const { name, value } = req.body;
  await Inputs.findOneAndUpdate({ name }, { value });
  res.json({
    ok: 1,
  });
});

router.post('/insertData', auth, async (req, res) => {
  const data = req.body.data;
  const col = req.body.col;
  const collection =
    col == 'Show'
      ? Show
      : col == 'Participant'
      ? Participant
      : col == 'Live'
      ? Live
      : Language;

  let promiseArr = [];
  try {
    data.forEach(item => promiseArr.push(runUpdate(collection, item)));
    Promise.all(promiseArr)
      .then(result => {
        res.json({
          data: data.sort((a, b) => b.value - a.value),
        });
      })
      .catch(e => res.status(400));
  } catch (error) {
    res.status(400);
  }
});

router.post('/insertLive', auth, async (req, res) => {
  const data = req.body.data;

  let promiseArr = [];
  try {
    data.map(el => {
      if (el._id) {
        promiseArr.push(runUpdate(Live, el));
        Promise.all(promiseArr);
      } else {
        const live = new Live(el);
        live.save();
      }
    });
    await Live.save(...data);
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

function runUpdate(Schema, item) {
  return new Promise((resolve, reject) => {
    Schema.findOneAndUpdate(
      {
        _id: item._id,
      },
      {
        name: item.name,
        nameUz: item.nameUz,
        nameEn: item.nameEn,
        value: item.value,
      }
    )
      .then(result => resolve())
      .catch(err => reject(err));
  });
}

module.exports = router;
