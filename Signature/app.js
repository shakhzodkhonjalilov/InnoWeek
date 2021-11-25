const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = config.get("port") || 3000;

app.use(
  express.json({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/document.routes"));

app.use("/", express.static(path.join(__dirname, "client", "dist")));
app.use(
  "/operator-panel",
  express.static(path.join(__dirname, "admin-panel", "dist"))
);

app.get("/operator-panel", (req, res) => {
  res.sendFile(path.resolve(__dirname, "admin-panel", "dist", "index.html"));
});

app.get("/operator-panel/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "admin-panel", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

users = [];
connections = [];

io.on("connection", socket => {
  connections.push(socket);
  console.log("Connect");

  socket.on("show", data => {
    io.emit("click", data);
  });

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnect");
  });
});

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    server.listen(PORT, () => {
      console.log(`App has benn started on port ${PORT}...`);
    });
  } catch (e) {
    console.log(`Server Error`, e.message);
    process.exit(1);
  }
}

start();
