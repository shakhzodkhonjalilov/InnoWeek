const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Views = require("../models/Views");
const router = Router();

// Mail create
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "mail.innoweek.uz",
  port: 587,
  secure: false,
  auth: {
    user: "notifications@innoweek.uz",
    pass: "26~jsyD826~jsyD8",
  },
  tls: {rejectUnauthorized: false},
});

async function sendMail(email, language) {
  try {
    const createMessage = require("../mail/mail");
    let html = createMessage(email, language);
    let subject =
      language === "ru"
        ? "Успешная регистрация на InnoWeek.Uz."
        : language === "uz"
        ? "InnoWeek.Uzda muvaffaqiyatli ro'yxatdan o'tildi."
        : "Successful registration on InnoWeek.Uz.";

    await transporter.sendMail({
      from: "notifications@innoweek.uz",
      to: email,
      subject: subject,
      text: "",
      html: html,
    });
  } catch (e) {
    console.log(e);
  }
}

async function recoveryPassword(email, password, language) {
  try {
    const createMessage = require("../mail/recovery");
    let html = createMessage(email, password, language);
    let subject =
      language === "ru"
        ? "InnoWeek.Uz: Подтверждение смены пароля"
        : language === "uz"
        ? "InnoWeek.Uz: Parolni o'zgartirishni tasdiqlash"
        : "InnoWeek.Uz: Password change confirmation";

    await transporter.sendMail({
      from: "notifications@innoweek.uz",
      to: email,
      subject: subject,
      text: "",
      html: html,
    });
  } catch (e) {
    console.log(e);
  }
}

const errorsMessage = {
  ru: {
    data: "Некорректные данные",
    email: "Некорректный email",
    length: "Минимальная длина пароля 4 символов",
    user: "Такой пользователь уже существует",
    smth: "Что-то пошло не так, попробуйте снова",
    password: "Введите пароль",
    invalid: "Неправильные данные пользователя",
  },
  en: {
    data: "Incorrect data",
    email: "Incorrect email",
    length: "Minimum password length 4 characters",
    user: "A user with this name already exists",
    smth: "Something went wrong, please try again",
    password: "Enter password",
    invalid: "Invalid user data",
  },
  uz: {
    data: "Ma'lumotlar noto'g'ri",
    email: "Elektron pochta noto'g'ri",
    length: "Parolning minimal uzunligi 4 ta belgi bo’lishi kerak",
    user: "Bu nomli foydalanuvchi tizimda mavjud",
    smth: "Xatolik yuz berdi. Qaytadan urining",
    password: "Parolni kiriting",
    invalid: "Foydalanuvchi ma’lumotlari noto‘g‘ri",
  },
};

router.post(
  "/register",
  [
    check("firstName").custom((value, { req }) => {
      if (!value.trim()) {
        throw new Error(errorsMessage[req.body.language].data);
      }
      return true;
    }),
    check("lastName").custom((value, { req }) => {
      if (!value.trim()) {
        throw new Error(errorsMessage[req.body.language].data);
      }
      return true;
    }),
    check("gender").custom((value, { req }) => {
      if (!value) {
        throw new Error(errorsMessage[req.body.language].data);
      }
      return true;
    }),
    check("country").custom((value, { req }) => {
      if (!value) {
        throw new Error(errorsMessage[req.body.language].data);
      }
      return true;
    }),
    check("born").custom((value, { req }) => {
      if (!value) {
        throw new Error(errorsMessage[req.body.language].data);
      }
      return true;
    }),
    check("email").custom((value, { req }) => {
      if (!value || !/.+@.+\..+/.test(value)) {
        throw new Error(errorsMessage[req.body.language].email);
      }
      return true;
    }),
    check("password").custom((value, { req }) => {
      if (!value.trim() || value.trim().length < 3) {
        throw new Error(errorsMessage[req.body.language].length);
      }
      return true;
    }),
  ],
  async (req, res) => {
    let error = {};
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { email, password, language } = req.body;

      error = errorsMessage[language];

      const candidate = await User.findOne({
        email,
      });

      if (candidate) {
        return res.status(400).json({
          message: error.user,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const data = {
        ...req.body,
        password: hashedPassword,
      };
      const user = new User(data);

      await user.save();

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "24h",
        }
      );

      res.status(201).json({
        token,
        lang: language,
      });

      await Views.findOneAndUpdate(
        {},
        {
          $inc: {
            views: 1,
          },
        }
      );

      sendMail(email, language);
    } catch (e) {
      res.status(500).json({
        message: error.smth,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email").custom((value, { req }) => {
      if (!value || !/.+@.+\..+/.test(value)) {
        throw new Error(errorsMessage[req.body.language].email);
      }
      return true;
    }),
    check("password").custom((value, { req }) => {
      if (!value.trim()) {
        throw new Error(errorsMessage[req.body.language].password);
      }
      return true;
    }),
  ],
  async (req, res) => {
    let error = {};
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { email, password, language } = req.body;
      error = errorsMessage[language];

      const user = await User.findOne({
        email: email.toLowerCase(),
      });

      if (!user) {
        return res.status(400).json({
          message: error.invalid,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: error.invalid,
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "24h",
        }
      );

      res.json({
        token,
        lang: language,
      });
      await Views.findOneAndUpdate(
        {},
        {
          $inc: {
            views: 1,
          },
        }
      );
    } catch (e) {
      res.status(500).json({
        message: error.smth,
      });
    }
  }
);

router.post(
  "/recovery",
  [check("email", "not correct email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, language } = req.body;
    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    recoveryPassword(email, password, language);
    res.json({ ok: 1 });
  }
);

module.exports = router;
