import { auth } from "../firebase";
import * as Sentry from "@sentry/node";

export default function(wrapped: any) {
  return async function(this: any) {
    const req: any = arguments[0];
    const res = arguments[1];
    try {
      const uid: string = req.body.uid;
      const token: string = req.body.token;
      // verify user is who they say they are
      const decodedToken = await auth.verifyIdToken(token);
      if (decodedToken.uid == uid) {
        return wrapped.apply(this, arguments);
      } else {
        throw new Error("decoded uid did not match passed uid");
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      return res.status(403).send("Could not validate token");
    }
  };
}
