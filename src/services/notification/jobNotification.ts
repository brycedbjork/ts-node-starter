import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import {
  GeoFirestore,
  GeoCollectionReference,
  GeoDocumentReference,
  GeoQuery,
  GeoQuerySnapshot
} from "geofirestore";
let geoFirestore = new GeoFirestore(firestore);
const geoUserLocations: GeoCollectionReference = geoFirestore.collection(
  "userLocations"
);
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";
import push from "./helpers/push";
import text from "./helpers/text";
import email from "./helpers/email";
import { Job } from "../../schemas/Job";

/*
Sends out notification for job to nearby students
*/

const NOTIFICATION_RADIUS = 20; // km

export default async (jobId: string, jobData?: Job) => {
  // get job
  if (!jobData) jobData = await getJob(jobId);

  // pull nearby students
  const { latitude, longitude } = jobData.coordinates;
  const query: GeoQuery = await geoUserLocations
    .near({
      center: new admin.firestore.GeoPoint(latitude, longitude),
      radius: NOTIFICATION_RADIUS
    })
    .where("type", "==", "student");
  const queryResults = await query.get();

  // get nearby students
  let userPromises: any[] = [];
  queryResults.forEach((result: any) => {
    userPromises.push(getUser(result.id, "student"));
  });
  const nearbyStudents = await Promise.all(userPromises);

  // construct notification calls
  let toBePushed: string[] = [];
  let toBeTexted: string[] = [];
  let numbers: string[] = [];
  let toBeEmailed: string[] = [];
  let emails: string[] = [];
  nearbyStudents.forEach(student => {
    if (student.notifications && student.notifications.job) {
      if (student.notifications.job.push === true) {
        toBePushed.push(student.id);
      }
      if (student.notifications.job.text === true) {
        toBeTexted.push(student.id);
        numbers.push(student.phoneNumber);
      }
      if (student.notifications.job.email === true) {
        toBeEmailed.push(student.id);
        emails.push(student.email);
      }
    }
  });

  await push(toBePushed, `${jobData.type} job available nearby`);
  await text(
    toBeTexted,
    `${jobData.type} job available nearby\nhireastudent.org/job/${jobId}`,
    numbers
  );
  await email(toBeEmailed, "job", emails);
};
