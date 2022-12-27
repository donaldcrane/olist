import { Router as expRouter } from "express";
import passport from "passport";
import "../controllers/google";
import { response } from "../utils";

const router = expRouter();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req) => {
    return response.success({
      userDetails: req.user,
      token: req.file,
    });
  }
);

export default router;
