import cors from "cors";
import express, { Response, Request, NextFunction } from "express";
import createError from "http-errors";
import morganBody from "morgan-body";
// needed to connect to DB later
// import mongoose from "mongoose";
import routes from "./routes";

const app = express();

// ENVIRONMENT VARIABLES GO HERE
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

// BEAUTIFIES REQUEST AND RESPONSE BODIES
morganBody(app, {
  prettify: NODE_ENV !== "production",
  theme: "darkened",
  dateTimeFormat: "utc",
});

// EXPRESS MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use all routes exported from the routes folder
app.use("/api", routes);
// used to catch any routes not found
app.use((req, _, next) => {
  next(createError(404, `Invalid route!!__: ${req.url}`));
});
// global error handler
// access by passing err with the next callback ie) next(err)
app.use(
  (
    error: { status: number; message: string },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const { status = 400, message } = error;
    res.status(status).json({ message });
  }
);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
