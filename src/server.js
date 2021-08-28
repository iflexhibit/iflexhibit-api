const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ route: "/", status: 200, msg: "Hello iflexhibit-api" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
