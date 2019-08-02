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
import { JobPost, Job } from "../../schemas/Job";
import * as Sentry from "@sentry/node";
import slack from "../../utils/slack";
import { Hirer } from "../../schemas/User";
import authenticate from "../../utils/authenticate";

let geoFirestore = new GeoFirestore(firestore);
const geoJobLocations: GeoCollectionReference = geoFirestore.collection(
  "jobLocations"
);
const geoUserLocations: GeoCollectionReference = geoFirestore.collection(
  "userLocations"
);

const NOTIFICATION_RADIUS = 20; // km

const createJob = async (
  req: { body: { uid: string; token: string; data: JobPost } },
  res: any
) => {
  try {
    const { uid, data } = req.body;

    // get user doc
    const userDoc = await firestore
      .collection("users")
      .doc(uid)
      .get();
    if (!userDoc.exists) {
      return res.status(400).send("User does not exist");
    }
    const userEntity = userDoc.data() as Hirer;

    // TODO: get display location from job's lat lng
    const displayLocation = `${userEntity.city}${
      userEntity.state ? `, ${userEntity.state}` : ""
    }${
      !userEntity.state && userEntity.country ? `, ${userEntity.country}` : ""
    }`;

    // construct and post job
    const newJob: any = {
      ...data,
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
      return res.status(403).send("Could not post job");
    }

    // make coordinates searchable with geofire
    const { latitude, longitude } = newJob.coordinates;
    const indexedLocation: GeoDocumentReference = await geoJobLocations.add({
      id: postedJob.id,
      type: newJob.type,
      coordinates: new admin.firestore.GeoPoint(latitude, longitude)
    });
    if (!indexedLocation) {
      return res.status(500).send("Could not index location");
    }

    // add indexedLocation to job entity
    const addedIndex = await firestore
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

    // successful post
    res.status(200).json({
      id: postedJob.id,
      data: newJob
    });

    // dont send out notifications for test post
    if (data.type == "test") {
      return;
    }

    // pull nearby students
    const query: GeoQuery = await geoUserLocations.near({
      center: new admin.firestore.GeoPoint(latitude, longitude),
      radius: NOTIFICATION_RADIUS
    });
    const queryResults = await query.get();

    // get entities of nearby students
    let userRefs: admin.firestore.DocumentReference[] = [];
    queryResults.forEach((result: any) => {
      userRefs.push(firestore.collection("users").doc(result.id));
    });
    const docs: admin.firestore.DocumentSnapshot[] = await firestore.getAll(
      ...userRefs
    );

    // send push notification to nearby users
    const payload = {
      notification: {
        body: `New ${newJob.type} job posted nearby`,
        badge: "1"
      }
    };
    let pushTokens = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      const pushToken = doc.get("pushToken");
      if (pushToken && doc.get("type") == "student") {
        pushTokens.push(pushToken);
      }
    }
    if (pushTokens.length > 0) {
      const sent = await messaging.sendToDevice(pushTokens, payload);
    }

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};

export default authenticate(createJob);
