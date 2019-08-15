import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { updateUser } from "../user/updateUser";
import createCustomer from "../pay/createCustomer";
import stripe from "../../stripe";

export const addCard = async (uid: string, cardToken: string) => {
  // get user
  const userData = await getUser(uid, "hirer");

  // get customer id
  let customerId = userData.customerId;
  if (!customerId) {
    customerId = await createCustomer(
      userData.email,
      `${userData.firstName} ${userData.lastName}`,
      userData.phoneNumber
    );
    await updateUser(uid, {
      customerId
    });
  }

  // add card token to customer
  await stripe.customers.update(customerId, {
    source: cardToken
  });
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      cardToken
    }: {
      uid: string;
      cardToken: string;
    } = req.body;

    await addCard(uid, cardToken);

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
