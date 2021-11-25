const { Router } = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/admin");
const router = Router();

router.post("/admin", async (req, res) => {
  const { login, password } = req.body;
  console.log(login);
  const admin = await Admin.findOne({ login });

  if (!admin) {
    res.status(400).json({ message: "Неправильные данные" });
  }

  const checkPassword = admin.password == password;

  if (!checkPassword) {
    res.status(400).json({ message: "Неправильные данные" });
  }

  const token = jwt.sign({ userId: admin.id }, config.get("jwtSecret"), {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
