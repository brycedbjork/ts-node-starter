import { auth, firestore, messaging } from "../../firebase";
import * as Sentry from "@sentry/node";

export const updateUser = async (uid: string, data: object) => {
  // get job entity
  const userDoc = await firestore
    .collection("users")
    .doc(uid)
    .get();
  if (!userDoc.exists) {
    throw new Error("User does not exist");
  }

  await firestore
    .collection("users")
    .doc(uid)
    .update(data);
};

export default async (req: any, res: any) => {
  try {
    const { uid, data }: { uid: string; data: object } = req.body;

    await updateUser(uid, data);

    return res.status(200).send();

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
