import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import createError from "http-errors";
import morganBody from "morgan-body";
import routes from "../routes";
// import { requireAuth } from "../middleware";

const app = express();

// ENVIRONMENT VARIABLES GO HERE
const NODE_ENV = process.env.NODE_ENV;

// BEAUTIFIES REQUEST AND RESPONSE BODIES
if (NODE_ENV === "development" || NODE_ENV === "test:withLogs") {
  morganBody(app, { theme: "darkened", dateTimeFormat: "utc" });
}

// EXPRESS MIDDLEWARES
app.use(
  cors({
    origin:
      NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://bears04.now.sh",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use all routes exported from the routes folder
app.use("/api", routes);

// used to catch any routes not found
app.use((req, _, next) => {
  next(createError(404, `Invalid route: ${req.url}`));
});

// global error handler
// access by passing err with the next callback ie) next(err)
const GlobalErrorHandler: ErrorRequestHandler = (
  { status, message }: { status: number; message: string },
  _req,
  res,
  _next
) => {
  res.status(status || 400).json({ message });
};
app.use(GlobalErrorHandler);

export default app;
