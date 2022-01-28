const express = require("express");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const { NODE_ENV } = require("./configs/config");
const rateLimit = require("express-rate-limit");

require("./configs/passport")(passport);

const app = express();
const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: CLIENT_URL }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", apiLimiter, require("./routes/index"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
