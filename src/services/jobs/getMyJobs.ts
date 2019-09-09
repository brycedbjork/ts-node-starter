import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import { firestore } from "../../firebase";
import { Job } from "../../schemas/Job";

/*
Gets user's jobs
For students, returns all jobs that you are matched with
For hirers, returns all jobs that you 
*/

export const getMyJobs = async (uid: string) => {
  let jobs: Job[] = [];

  const userData = await getUser(uid, null);

  const field = userData.type == "hirer" ? "hirer.id" : `matchedUsers.${uid}`;
  const value = userData.type == "hirer" ? uid : true;

  const querySnap = await firestore
    .collection("jobs")
    .where(field, "==", value)
    .get();

  querySnap.docs.forEach(doc => {
    jobs.push({
      id: doc.id,
      ...doc.data()
    } as Job);
  });
  return jobs;
};

export default async (req: any, res: any) => {
  try {
    const {
      uid
    }: {
      uid: string;
    } = req.params;

    const jobs = await getMyJobs(uid);

    // successful post
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
