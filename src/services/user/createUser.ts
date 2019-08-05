import { firestore } from "../../firebase";
import admin from "firebase-admin";
import moment from "moment";
import { BaseUser } from "../../schemas/User";
import * as Sentry from "@sentry/node";
import slack from "../../utils/slack";

export const createUser = async (uid: string, data: BaseUser) => {
  // get user doc
  const userDoc = await firestore
    .collection("users")
    .doc(uid)
    .get();
  if (userDoc.exists) {
    throw new Error("User already exists");
  }

  const displayLocation = `${data.city}${data.state ? `, ${data.state}` : ""}${
    !data.state && data.country ? `, ${data.country}` : ""
  }`;

  // construct and set user data
  const newUser: any = {
    ...data,
    displayLocation,
    joinedTime: moment().unix(),
    joinedDate: moment().format()
  };
  const createdUser: admin.firestore.WriteResult = await firestore
    .collection("users")
    .doc(uid)
    .set(newUser, { merge: true });
  if (!createdUser) {
    throw new Error("Could not create user");
  }

  // log signup
  slack(
    `*Signup* ${newUser.type} in ${newUser.city} in ${
      newUser.displayLocation
    } _${newUser.firstName} ${newUser.lastName} ${newUser.email} ${
      newUser.phoneNumber
    }_`
  );
};

export default async (req: any, res: any) => {
  try {
    const { uid, data }: { uid: string; data: BaseUser } = req.body;

    const newUser = await createUser(uid, data);

    // successful signup
    res.status(200).json({
      data: newUser
    });

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
