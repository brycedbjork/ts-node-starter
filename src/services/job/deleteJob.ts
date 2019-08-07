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
import { Job } from "../../schemas/Job";
import slack from "../../utils/slack";
import authenticate from "../../utils/authenticate";

let geoFirestore = new GeoFirestore(firestore);
const geoJobLocations: GeoCollectionReference = geoFirestore.collection(
  "jobLocations"
);

const deleteJob = async (jobId: string) => {
  // get job entity
  const jobDoc = await firestore
    .collection("jobs")
    .doc(jobId)
    .get();
  if (!jobDoc.exists) {
    throw new Error("Job does not exist");
  }

  // delete location key
  const jobEntity = jobDoc.data() as Job;
  if (jobEntity.locationKey) {
    await geoJobLocations.doc(jobEntity.locationKey).delete();
  }

  // delete job itself
  await firestore
    .collection("jobs")
    .doc(jobId)
    .delete();
};

export default async (req: any, res: any) => {
  try {
    const { jobId }: { jobId: string } = req.body;

    await deleteJob(jobId);

    return res.status(200).send();

    // TODO: notify matched students?

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
