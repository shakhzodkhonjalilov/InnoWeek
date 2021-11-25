const { Router } = require("express");
const Auth = require("../models/auth");
const router = Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body;
  const auth = await Auth.findOne({ login });
  if (auth && auth.password == password) {
    res.json({ id: 1 });
  } else {
    res.status(400).json({ message: "Неправильные данные" });
  }
});

module.exports = router;
