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

const deleteJob = async (jobId: string, uid?: string) => {
  // get job entity
  const jobDoc = await firestore
    .collection("jobs")
    .doc(jobId)
    .get();
  if (!jobDoc.exists) {
    throw "Job does not exist";
  }
  const jobEntity = jobDoc.data() as Job;

  // check if user can delete job
  if (uid && jobEntity.hirer.id != uid) {
    throw "User cannot delete Job";
  }

  // delete location key
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
    const { id }: { id: string } = req.params;
    const { uid }: { uid: string } = req.body;

    await deleteJob(id, uid);

    return res.status(200).send();

    // TODO: notify matched students?

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
