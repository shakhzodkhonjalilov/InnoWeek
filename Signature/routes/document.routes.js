const { Router } = require('express');
const Documents = require('../models/documents');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/document/:id', async (req, res) => {
  const link = req.params.id;
  const document = await Documents.find({ link });
  res.json(document);
});

router.get('/documents', auth, async (req, res) => {
  const document = await Documents.find({});
  res.json(document);
});

router.post('/document/create', auth, async (req, res) => {
  try {
    const document = new Documents(req.body);
    await document.save();

    res.status(201).json({
      link: req.body.link,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/document/update', auth, async (req, res) => {
  try {
    const { _id, users, link, document } = req.body;

    await Documents.findOneAndUpdate({ _id }, { users, link, document });

    res.json({
      link,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/document/remove', auth, async (req, res) => {
  try {
    const { link } = req.body;
    await Documents.findOneAndRemove({ link });

    res.json({ link });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post('/document/sign', async (req, res) => {
  try {
    const { link, info } = req.body;
    const update = { $set: { 'users.$[elem].sign': true } };
    const options = { new: true, arrayFilters: [{ 'elem.info': info }] };
    console.log(update);
    await Documents.findOneAndUpdate({ link }, update, options);

    res.json({ link });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
