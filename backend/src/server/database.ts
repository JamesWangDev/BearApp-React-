import mongoose from "mongoose";

const NODE_ENV = process.env.NODE_ENV;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const url = process.env.DB_URL;

const mongoURL = `mongodb+srv://${user}:${password}@${url}${NODE_ENV}?retryWrites=true&w=majority`;
const mongoMsg = (msg: string) => console.log(`DB connection ${msg}`);
const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

function connectToDB() {
  mongoose
    .connect(mongoURL, mongoOpts)
    .then(() => mongoMsg("established"))
    .catch((err: string) => mongoMsg(`failed - (${err})`));

  mongoose.connection.on("error", err => mongoMsg(`severed - (${err})`));
}

export default connectToDB;
export { mongoOpts };
