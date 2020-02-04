const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server running from port ${PORT}🚀`);
});
