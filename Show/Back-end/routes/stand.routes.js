const { Router } = require('express');
const Stand = require('../models/Stand');
const auth = require('../middleware/auth.middleware');
const router = Router();

async function standUpdate(req, res, type, check = false) {
  const { name, like } = req.body;
  const { userId } = req.user;
  try {
    const stand = await Stand.findOne({ name }, { [type]: 1 });
    const candidate = stand[type].filter(el => el.userId === userId);

    if (!candidate.length && !check) {
      await Stand.findOneAndUpdate({ name }, { $push: { [type]: { userId } } });
      res.json({ ok: 1, text: 'Вы посмотрели' });
    } else if (candidate.length && !check) {
      res.json({ ok: 2, text: 'Вы уже смотрели' });
    } else if (!candidate.length && like) {
      await Stand.findOneAndUpdate({ name }, { $push: { [type]: { userId } } });
      res.json({ ok: 1, text: 'Вы лайкнули' });
    } else if (candidate.length && check) {
      res.json({ ok: 2, text: 'Вы уже лайкали' });
    } else if (!candidate.length && check) {
      res.json({ ok: 1, text: 'Вы еще не лайкали' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

router.post('/view', auth, async (req, res) => {
  standUpdate(req, res, 'viewers');
});

router.post('/like', auth, async (req, res) => {
  standUpdate(req, res, 'likes', true);
});

router.get('/static', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://185.211.129.125:53081');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    const stand = await Stand.find({}, { _id: 0 });
    const data = stand.map(el => {
      return {
        name: el.name,
        views: el.viewers.length,
        likes: el.likes.length,
      };
    });
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/rating', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    const stand = await Stand.find({}, { _id: 0, views: 0 });
    const data = stand
      .map(el => {
        return {
          name: el.name,
          likes: el.likes.length,
        };
      })
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get('/like-list', auth, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  try {
    const stand = await Stand.find({}, { _id: 0, views: 0 });
    const data = stand
      .map(el => {
        let liked = !!el.likes.filter(user => user.userId === req.user.userId)
          .length;
        return {
          name: el.name,
          likes: el.likes.length,
          liked,
        };
      })
      .sort((a, b) => b.likes - a.likes);
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
