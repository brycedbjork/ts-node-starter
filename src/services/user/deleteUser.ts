import { auth, firestore, messaging } from "../../firebase";
import admin from "firebase-admin";
import {
  GeoFirestore,
  GeoCollectionReference,
  GeoDocumentReference,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { Student, Hirer } from "../../schemas/User";

let geoFirestore = new GeoFirestore(firestore);
const geoUserLocations: GeoCollectionReference = geoFirestore.collection(
  "userLocations"
);

export const deleteUser = async (uid: string) => {
  // get user entity
  const userDoc = await firestore
    .collection("users")
    .doc(uid)
    .get();
  if (!userDoc.exists) {
    throw new Error("User does not exist");
  }

  const userEntity = userDoc.data() as Student | Hirer;

  // delete chats
  const chatQuery = await firestore
    .collection("chats")
    .where("hirer.id", "==", uid)
    .get();
  let chatDeletes: any[] = [];
  chatQuery.docs.forEach(doc => {
    chatDeletes.push(
      firestore
        .collection("chats")
        .doc(doc.id)
        .delete()
    );
  });
  await Promise.all(chatDeletes);

  // TODO: notify other party in chat that it was closed?

  if (userEntity.type == "hirer") {
    // delete jobs
    const jobsQuery = await firestore
      .collection("jobs")
      .where("hirer.id", "==", uid)
      .get();
    let chatDeletes: any[] = [];
    chatQuery.docs.forEach(doc => {
      chatDeletes.push(
        firestore
          .collection("chats")
          .doc(doc.id)
          .delete()
      );
    });
    await Promise.all(chatDeletes);
  }

  // delete location key
  if (userEntity.locationKey) {
    await geoUserLocations.doc(userEntity.locationKey).delete();
  }

  // delete job itself
  await firestore
    .collection("users")
    .doc(uid)
    .delete();

  return;
};

export default async (req: any, res: any) => {
  try {
    const { uid }: { uid: string } = req.body;
    await deleteUser(uid);
    return res.status(200).send();
  } catch (error) {
    res.status(error.status).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
