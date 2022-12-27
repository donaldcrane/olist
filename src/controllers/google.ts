import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../config";
import { db } from "../models";
// import { IUser } from "../utils/interface";
import { generateToken } from "../utils";

// const GoogleStrategy = passportGoogle.Strategy;
passport.use(
  new Strategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CLIENT_CALLBACK,
    },
    async (accessToken: string, refreshToken: string, profile, done) => {
      const user = await db.users.findFirst({
        where: { email: profile.emails?.[0].value },
      });
      if (user) {
        const { id, email } = user;
        const token = await generateToken({ id, email });

        return done(null, user, token);
      }

      done(null);
    }
  )
);
