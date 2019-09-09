import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import admin from "firebase-admin";
import { firestore } from "../../firebase";
import { Job } from "../../schemas/Job";

import {
  GeoFirestore,
  GeoCollectionReference,
  GeoDocumentReference,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
let geoFirestore = new GeoFirestore(firestore);
const geoJobLocations: GeoCollectionReference = geoFirestore.collection("jobLocations");

/*
Gets nearby jobs
*/

export const getNearbyJobs = async (uid: string, jobType: string | null, radius: number) => {
  const userData = await getUser(uid, null);

  // pull nearby jobs
  if (!userData.coordinates) {
    throw "no location data for user";
  }
  const { latitude, longitude } = userData.coordinates;
  let query: GeoQuery = geoJobLocations.near({
    center: new admin.firestore.GeoPoint(latitude, longitude),
    radius
  });
  if (jobType) {
    query = query.where("type", "==", jobType);
  }
  const queryResults = await query.get();

  // get nearby students
  let jobPromises: any[] = [];
  queryResults.forEach((result: any) => {
    jobPromises.push(getJob(result.id));
  });
  const nearbyJobs = (await Promise.all(jobPromises)) as Job[];

  return nearbyJobs;
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      radius,
      jobType
    }: {
      uid: string;
      radius: number;
      jobType: string | null;
    } = req.query;

    const jobs = await getNearbyJobs(uid, jobType, radius);

    // successful post
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
