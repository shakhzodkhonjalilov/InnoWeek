const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json({ extended: true }));

app.use(helmet());
app.use(cors(corsOptions));

app.use('/api', require('./routes/data.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.use('/', express.static(path.join(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
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
