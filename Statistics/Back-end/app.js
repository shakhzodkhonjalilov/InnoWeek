const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", require("./routes/data.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
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
