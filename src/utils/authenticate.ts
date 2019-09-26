import { auth } from "../firebase";
import * as Sentry from "@sentry/node";
import atob from "atob";
import express from "express";

/*
  wraps express routes and authenticates the passed token
*/
export default function(wrapped: any) {
  return async function(this: any) {
    let req: express.Request = arguments[0];
    const res: express.Response = arguments[1];
    try {
      const authString = req.headers.authorization;
      if (typeof authString != "string") {
        throw "no auth string";
      }
      const authBase64 = authString.split(" ")[1];
      const decodedAuth = atob(authBase64);
      const uid = decodedAuth.split(":")[0];
      const token = decodedAuth.split(":")[1];

      req.headers.uid = uid;

      // verify user is who they say they are
      const decodedToken = await auth.verifyIdToken(token);
      if (decodedToken.uid == uid) {
        return wrapped.apply(this, arguments);
      } else {
        throw "decoded uid did not match passed uid";
      }
    } catch (error) {
      // Sentry.captureException(error);
      console.log(error);
      return res.status(403).send("Could not validate token");
    }
  };
}
