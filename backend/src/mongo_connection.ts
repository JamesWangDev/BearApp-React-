var mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const url = process.env.DB_URL;

mongoose.connect(
  `mongodb+srv://${user}:${password}@${url}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

module.exports = mongoose;
