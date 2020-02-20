import mongoose from "mongoose";

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const url = process.env.DB_URL;

const mongoURL = `mongodb+srv://${user}:${password}@${url}?retryWrites=true&w=majority`;
const mongoMsg = (msg: string) => console.log(`DB connection ${msg}`);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => mongoMsg("established"))
  .catch((err: string) => mongoMsg(`failed - (${err})`));

mongoose.connection.on("error", err => mongoMsg(`severed - (${err})`));
