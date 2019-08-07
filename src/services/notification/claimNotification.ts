import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import { Job } from "../../schemas/Job";
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";
import { getChat } from "../chat/getChat";
import push from "./helpers/push";
import text from "./helpers/text";
import email from "./helpers/email";
import { Chat } from "../../schemas/Chat";

/*
Sends notification to hirer that student has claimed their job
*/

export default async (
  uid: string,
  jobId: string,
  chatId: string,
  jobData?: Job,
  chatData?: Chat
) => {
  if (!jobData) jobData = await getJob(jobId);
  if (!chatData) chatData = await getChat(chatId);

  // get users
  const claimingUser = await getUser(uid, "student");
  const hiringUser = await getUser(jobData.hirer.id, "hirer");

  if (hiringUser.notifications && hiringUser.notifications.jobs) {
    if (hiringUser.notifications.jobs.push) {
      await push({
        uid,
        body: `${claimingUser.firstName} claimed your ${jobData.type} job`,
        data: {
          chatId
        }
      });
    }
    if (hiringUser.notifications.jobs.text) {
      await text({
        uid,
        message: `${claimingUser.firstName} claimed your ${
          jobData.type
        } job\nhireastudent.org/chat/${chatId}`
      });
    }
    if (hiringUser.notifications.jobs.email) {
      await email({
        uid,
        type: "jobClaimed",
        userEmail: hiringUser.email,
        jobId,
        jobData
      });
    }
  }
};
