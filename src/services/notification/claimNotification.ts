import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import { Job } from "../../schemas/Job";
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";

/*
Sends notification to hirer that student has claimed their job
*/

export default async (uid: string, jobId: string, jobData?: Job) => {
  if (!jobData) {
    jobData = await getJob(jobId);
  }

  // get users
  const claimingUser = await getUser(uid, "student");
  const hiringUser = await getUser(jobData.hirer.id, "hirer");
};
