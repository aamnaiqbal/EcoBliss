const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODBCLUSTER)
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => console.log("Some error has occured in connecting to DB."));

app.listen(8000, () => {
  console.log("Server has started.");
});
