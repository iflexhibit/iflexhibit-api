const express = require("express");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const { NODE_ENV } = require("./configs/config");

require("./configs/passport")(passport);

const app = express();
const CLIENT_URL =
  NODE_ENV === "production"
    ? "https://iflexhibit.com"
    : "http://localhost:3000";

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./routes/index"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
