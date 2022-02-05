const express = require("express");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const { NODE_ENV, db } = require("./configs/config");
const PGStore = require("connect-pg-simple");
const path = require("path");
const session = require("express-session");
const { pool } = require("./configs/database");

require("./configs/passport")(passport);

const app = express();
const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    store: new (PGStore(session))({
      pool,
      pruneSessionInterval: 60,
    }),
    cookie: { maxAge: db.COOKIE_MAXAGE },
    secret: db.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(cors({ origin: CLIENT_URL }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./routes/api"));
app.use("/dashboard", require("./routes/dashboard"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("src/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
