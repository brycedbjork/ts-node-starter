import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";
import push from "./helpers/push";
import text from "./helpers/text";
import email from "./helpers/email";
import { Job } from "../../schemas/Job";

/*
Sends out notification for job to invited students
*/

export default async (jobId: string, jobData?: Job) => {
  // get job
  if (!jobData) jobData = await getJob(jobId);

  if (!jobData.invited) {
    // nobody to invite
    return;
  }

  // get invited students
  let userPromises: any[] = Object.keys(jobData.invited).map(user =>
    getUser(user, "student")
  );
  const invitedStudents = await Promise.all(userPromises);

  // construct notification calls
  let toBePushed: string[] = [];
  let toBeTexted: string[] = [];
  let numbers: string[] = [];
  let toBeEmailed: string[] = [];
  let emails: string[] = [];
  invitedStudents.forEach(student => {
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

  await push({
    uid: toBePushed,
    body: `${jobData.hirer.firstName} invited you to do a ${jobData.type} job`,
    data: { jobId }
  });
  await text({
    uid: toBeTexted,
    message: `${jobData.hirer.firstName} invited you to do a ${
      jobData.type
    } job\nhireastudent.org/job/${jobId}`,
    userPhoneNumber: numbers
  });
  await email({
    uid: toBeEmailed,
    type: "invitedJob",
    userEmail: emails,
    jobId,
    jobData
  });
};
