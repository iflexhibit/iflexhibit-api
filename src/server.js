const express = require("express");
const session = require("express-session");
const passport = require("passport");
const PGStore = require("connect-pg-simple");
const cors = require("cors");
const morgan = require("morgan");
const { db, NODE_ENV } = require("./configs/config");
const { pool } = require("./configs/database");

require("./configs/passport")(passport);

const app = express();
const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(
  session({
    store: new (PGStore(session))({
      pool,
      pruneSessionInterval: 60,
    }),
    cookie: { maxAge: db.COOKIE_MAXAGE, secure: false, sameSite: "strict" },
    secret: db.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./routes/index"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
