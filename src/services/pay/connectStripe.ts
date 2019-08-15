import { updateUser } from "../user/updateUser";
import axios from "axios";
import * as Sentry from "@sentry/node";

export const connectStripe = async (uid: string, code: string) => {
  const response: any = axios.post("https://connect.stripe.com/oauth/token", {
    client_secret: process.env.STRIPE_SECRET_KEY,
    code,
    grant_type: "authorization_code"
  });

  if (response.data && response.data.stripe_user_id) {
    const stripeId = response.data.stripe_user_id;
    await updateUser(uid, {
      stripeId
    });
  } else {
    throw new Error("Invalid stripe response");
  }
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      code
    }: {
      uid: string;
      code: string;
    } = req.query; // GET

    await connectStripe(uid, code);

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
