import { firestore, messaging } from "../../firebase";
import admin from "firebase-admin";
import {
  GeoFirestore,
  GeoCollectionReference,
  GeoDocumentReference,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
import moment from "moment";
import { JobPost, Job } from "../../schemas/Job";
import * as Sentry from "@sentry/node";
import slack from "../../utils/slack";
import { Student } from "../../schemas/User";
import claimNotification from "../notification/claimNotification";
import { getUser } from "../user/getUser";
import { updateJob } from "../job/updateJob";

let geoFirestore = new GeoFirestore(firestore);
const geoJobLocations: GeoCollectionReference = geoFirestore.collection(
  "jobLocations"
);

export const claimJob = async (uid: string, jobId: string) => {
  // update job with claim
  const jobData = await updateJob(jobId, {
    [`matchedUsers.${uid}`]: true,
    status: "claimed"
  });

  // log
  slack(`*Job Claimed* ${jobData.type} in ${jobData.displayLocation}`);

  return jobData;
};

export default async (req: any, res: any) => {
  try {
    const { uid, jobId }: { uid: string; jobId: string } = req.body;

    const job = await claimJob(uid, jobId);

    // successful post
    res.status(200).send();

    await claimNotification(uid, jobId, job);
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
