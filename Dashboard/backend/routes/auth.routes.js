const { Router } = require("express");
const Auth = require("../models/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body;
  const auth = await Auth.findOne({ login });
  if (auth && auth.password == password) {
    const token = jwt.sign(
      {
        userId: auth.id,
      },
      config.get("jwtSecret"),
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } else {
    res.status(400).json({ message: "Неправильные данные" });
  }
});

module.exports = router;
