import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { WebReferral, DirectReferral } from "../../schemas/Refer";
import { getUser } from "../user/getUser";
import referralNotification from "../notification/referralNotification";
import { purePhone } from "../../utils/formatPhone";

export const addReferral = async (
  type: "web" | "direct",
  phoneNumber: string,
  uid: string,
  name?: string,
  email?: string
) => {
  // check if there is already a user registered with that phone number
  const check = await firestore
    .collection("users")
    .where("phoneNumber", "==", purePhone(phoneNumber))
    .get();
  if (!check.empty && type == "direct") {
    // user already exists, no need to add direct referral
    return;
  }

  // get user doc
  let userData: any;
  if (uid) {
    userData = await getUser(uid, null);
  }

  // construct referral
  let newReferral: any;
  switch (type) {
    case "web":
      if (uid) {
        newReferral.user = {
          id: uid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image
        };
      }
      newReferral.phoneNumber = purePhone(phoneNumber);
      newReferral.time = moment().unix();
      newReferral.date = moment().format();
      newReferral = <WebReferral>newReferral;
      break;

    case "direct":
      if (uid) {
        newReferral.user = {
          id: uid,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image
        };
      }
      if (newReferral.phoneNumber)
        newReferral.phoneNumber = purePhone(phoneNumber);
      if (newReferral.email) newReferral.email = email;
      if (newReferral.name) newReferral.name = name;
      newReferral.time = moment().unix();
      newReferral.date = moment().format();
      newReferral = <DirectReferral>newReferral;
      break;
  }

  // add referral
  await firestore.collection("referrals").add(newReferral);

  // send out notification
  await referralNotification(newReferral);
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      type,
      name,
      phoneNumber,
      email
    }: {
      uid: string;
      type: "web" | "direct";
      name?: string;
      phoneNumber: string;
      email?: string;
    } = req.body;

    await addReferral(type, phoneNumber, uid, name, email);

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
