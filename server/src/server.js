const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(3000, "192.168.1.104", () => {
  console.log("Server running on http://localhost:3000");
});
