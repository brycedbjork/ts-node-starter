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
import { Hirer } from "../../schemas/User";
import jobNotification from "../notification/jobNotification";

let geoFirestore = new GeoFirestore(firestore);
const geoJobLocations: GeoCollectionReference = geoFirestore.collection(
  "jobLocations"
);

export const createJob = async (uid: string, data: JobPost) => {
  // get user doc
  const userDoc = await firestore
    .collection("users")
    .doc(uid)
    .get();
  if (!userDoc.exists) {
    throw new Error("User does not exist");
  }
  const userEntity = userDoc.data() as Hirer;

  // TODO: get display location from job's lat lng
  const displayLocation = `${userEntity.city}${
    userEntity.state ? `, ${userEntity.state}` : ""
  }${!userEntity.state && userEntity.country ? `, ${userEntity.country}` : ""}`;

  // construct and post job
  const newJob: any = {
    ...data,
    active: true,
    postedTime: moment().unix(),
    postedDate: moment().format(),
    hirer: {
      id: uid,
      firstName: userEntity.firstName,
      image: userEntity.image
    },
    matchedUsers: {},
    displayLocation
  };
  const postedJob: admin.firestore.DocumentReference = await firestore
    .collection("jobs")
    .add(newJob);
  if (!postedJob) {
    throw new Error("Could not post job");
  }

  // make coordinates searchable with geofire
  const { latitude, longitude } = newJob.coordinates;
  const indexedLocation: GeoDocumentReference = await geoJobLocations.add({
    id: postedJob.id,
    type: newJob.type,
    coordinates: new admin.firestore.GeoPoint(latitude, longitude)
  });
  if (!indexedLocation) {
    throw new Error("Could not index location");
  }

  // add indexedLocation to job entity
  await firestore
    .collection("jobs")
    .doc(postedJob.id)
    .update({
      locationKey: indexedLocation.id
    });

  // log job post
  slack(
    `*Job Post* ${newJob.type} for ${newJob.hirer.firstName} in ${
      newJob.displayLocation
    } _${newJob.description}_`
  );

  return {
    id: postedJob.id,
    job: newJob
  };
};

export default async (req: any, res: any) => {
  try {
    const { uid, data }: { uid: string; data: JobPost } = req.body;

    const { id, job }: { id: string; job: Job } = await createJob(uid, data);

    // successful post
    res.status(200).json({
      id: id,
      data: job
    });

    if (data.type != "test") {
      await jobNotification(id);
    }

    return;
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
