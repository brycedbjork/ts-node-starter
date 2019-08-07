import { firestore } from "../../firebase";
import admin from "firebase-admin";
import {
  GeoFirestore,
  GeoCollectionReference,
  GeoDocumentReference,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
import * as Sentry from "@sentry/node";
import authenticate from "../../utils/authenticate";
import { getUser } from "../user/getUser";

let geoFirestore = new GeoFirestore(firestore);
const geoUserLocations: GeoCollectionReference = geoFirestore.collection(
  "userLocations"
);

export const locateUser = async (
  uid: string,
  coordinates: { latitude: number; longitude: number }
) => {
  // get user
  const userData = await getUser(uid, null);

  // add to location collection
  const { latitude, longitude } = coordinates;
  const indexedLocation: GeoDocumentReference = await geoUserLocations.add({
    id: uid,
    type: userData.type,
    coordinates: new admin.firestore.GeoPoint(latitude, longitude)
  });
  if (!indexedLocation) {
    throw new Error("Could not index location");
  }

  // add indexedLocation to job entity
  await firestore
    .collection("users")
    .doc(uid)
    .update({
      locationKey: indexedLocation.id
    });
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      coordinates
    }: {
      uid: string;
      coordinates: { latitude: number; longitude: number };
    } = req.body;

    await locateUser(uid, coordinates);

    return res.status(200).send();

    // success
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
