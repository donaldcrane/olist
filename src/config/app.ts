/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
// import cookieSession from "cookie-session";
import router from "./routes/index";
import config from "./config";
import db from "./config/database";
import models from "./models";
import "./controllers/google";

import reqLogger from "./utils/reqLogger";
import { CustomRequest, IUser, IFile } from "./utils/interface";

const app = express();
const port = config.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: config.COOKIE_KEY,
// }));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "SECRET",
  cookie: { secure: true }
}));

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
    interface User extends IUser { }
    interface File extends IFile { }
  }
}

app.use(reqLogger); // request logger
app.use("/api/v1", router);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await models.User.findById(id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(`Welcome to ${config.APP_NAME} app`);
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct kindly check url.",
}));

(async () => {
  process.on("warning", (e) => config.logger.warn(e.stack));
  console.log("Waiting for DATABASE Connection...");
  await db.connect();
  app.listen(config.PORT || 4000, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error: any) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
  //  throw error;
});

export default app;
