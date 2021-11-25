const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Subscribers = require('../models/Subscribers');
const router = Router();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  pool: true,
  host: 'mail.innoweek.uz',
  port: 587,
  secure: false,
  auth: {
    user: 'notifications@innoweek.uz',
    pass: '26~jsyD826~jsyD8',
  },
  tls: { rejectUnauthorized: false },
});

async function sendMail(email, language, type) {
  try {
    const weekMail = require(`../mail/week`);
    const threeMail = require(`../mail/three`);
    const todayMail = require(`../mail/today`);
    const resultMail = require(`../mail/result`);

    let week, three, today, result;
    if (language == 'ru') {
      week =
        '7 дней до начала Международной недели инновационных идей InnoWeek.Uz';
      three =
        '3 дня до начала Международной недели инновационных идей InnoWeek.Uz';
      today =
        'Сегодня стартует Международная неделя инновационных идей InnoWeek.Uz';
      result =
        'Спасибо за участие в мероприятиях Международной недели инновационных идей InnoWeek.Uz!';
    } else if (language == 'uz') {
      week =
        "InnoWeek.Uz Xalqaro innovatsion g'oyalar haftaligi boshlanishiga 7 KUN QOLDI";
      three =
        "InnoWeek.Uz Xalqaro innovatsion g'oyalar haftaligi boshlanishiga 3 KUN QOLDI";
      today =
        "InnoWeek.Uz xalqaro innovatsion g'oyalar haftaligi bugun boshlanadi";
      result =
        "InnoWeek.Uz Xalqaro innovatsion g'oyalar haftaligi tadbirlarida ishtirok etganingiz uchun tashakkur!";
    } else {
      week =
        '7 days before the start of the InnoWeek.Uz – the International week of innovative ideas';
      three =
        '3 days before the start of InnoWeek.Uz - the International week of innovative ideas';
      today =
        'InnoWeek.Uz – the International week of innovative ideas starts today';
      result =
        'Thank you for participating on the events of the International Week of Innovative Ideas InnoWeek.Uz!';
    }

    let createMessage, subject;
    if (type == 'week') {
      subject = week;
      createMessage = weekMail;
    } else if (type == 'three') {
      subject = three;
      createMessage = threeMail;
    } else if (type == 'today') {
      subject = today;
      createMessage = todayMail;
    } else {
      subject = result;
      createMessage = resultMail;
    }

    let html = createMessage(email, language);

    await transporter.sendMail({
      from: 'notifications@innoweek.uz',
      to: email,
      subject: subject,
      text: '',
      html: html,
    });
  } catch (e) {
    console.log(e);
  }
}

const email = [
  'shevchenko.viktor.n@gmail.com',
  'street_lamp@mail.ru',
  'street-lamp-15@yandex.com',
  'Safinam007@mail.ru',
  'ali93@mail.ru',
  'rakhimovalisher1993@gmail.com',
  'a.rakhimov@smartchain.uz',
  'tms.danger@mail.ru',
  'tms.famous@yandex.ru',
  'aza68688@yandex.uz',
];

router.get('/mailing', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://185.211.129.125:53081');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    let type = req.query.type;
    const userData = await User.find(
      {},
      { email: 1, language: 1, mailing: 1, _id: 0 }
    );
    let users = userData.filter(el => el.mailing);
    const subscribers = await Subscribers.find(
      {},
      { email: 1, language: 1, _id: 0 }
    );

    let mails = [...users, ...subscribers].map(el => {
      let email = el.email;
      let language = el.language ? el.language : 'ru';
      return { email, language };
    });

    mails.map(({ email, language }, idx) => {
      setTimeout(async () => {
        await sendMail(email, language, type);
      }, idx * 300);
    });
    res.json({ mails: mails.length });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post(
  '/subscribe',
  [check('email', 'not correct email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email } = req.body;
    const subCandidate = await Subscribers.findOne({ email });
    const candidate = await User.findOne({ email });

    if (candidate || subCandidate) {
      return res.status(400).json({ message: 'has email' });
    }

    const subscribers = new Subscribers(req.body);
    await subscribers.save();

    res.json({ email });
  }
);

module.exports = router;
