const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(
  express.json({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://innoweek.uz');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/stand', require('./routes/stand.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/mailing.routes'));

app.use('/', express.static(path.join(__dirname, 'client', 'ru', 'start')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'ru', 'start', 'index.htm'));
});
app.get('/ru', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'ru', 'start', 'index.htm'));
});

app.use('/uz', express.static(path.join(__dirname, 'client', 'uz', 'start')));
app.get('/uz', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'uz', 'start', 'index.htm'));
});

app.use('/en', express.static(path.join(__dirname, 'client', 'en', 'start')));
app.get('/en', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'en', 'start', 'index.htm'));
});

app.use('/auth', express.static(path.join(__dirname, 'client', 'auth')));
app.get('/auth', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'auth', 'index.html'));
});
app.get('/auth/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'auth', 'index.html'));
});

app.use('/likes', express.static(path.join(__dirname, 'client', 'likes')));
app.get('/likes', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'likes', 'index.html'));
});

const routes = [
  { dir: 'ru', route: 'main' },
  { dir: 'ru', route: 'sector-a' },
  { dir: 'ru', route: 'sector-b' },
  { dir: 'ru', route: 'sector-c' },
  { dir: 'ru', route: 'sector-d' },
  { dir: 'ru', route: 'sector-e' },
  { dir: 'ru', route: 'sector-f' },

  { dir: 'uz', route: 'main' },
  { dir: 'uz', route: 'sector-a' },
  { dir: 'uz', route: 'sector-b' },
  { dir: 'uz', route: 'sector-c' },
  { dir: 'uz', route: 'sector-d' },
  { dir: 'uz', route: 'sector-e' },
  { dir: 'uz', route: 'sector-f' },

  { dir: 'en', route: 'main' },
  { dir: 'en', route: 'sector-a' },
  { dir: 'en', route: 'sector-b' },
  { dir: 'en', route: 'sector-c' },
  { dir: 'en', route: 'sector-d' },
  { dir: 'en', route: 'sector-e' },
  { dir: 'en', route: 'sector-f' },
];

routes.map(({ dir, route }) => {
  app.use(
    `/${dir}/${route}`,
    express.static(path.join(__dirname, 'client', dir, route))
  );
  app.get(`/${dir}/${route}`, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', dir, route, 'index.htm'));
  });
});

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () =>
      console.log(`App has benn started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(`Server Error`, e.message);
    process.exit(1);
  }
}
start();
