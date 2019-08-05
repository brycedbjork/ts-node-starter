import { firestore, messaging } from "../../firebase";
import admin from "firebase-admin";
import moment from "moment";
import { JobPost, Job } from "../../schemas/Job";
import * as Sentry from "@sentry/node";
import slack from "../../utils/slack";
import { Student } from "../../schemas/User";
import claimNotification from "../notification/claimNotification";
import { getUser } from "../user/getUser";
import { createChat } from "../chat/createChat";
import { updateJob } from "../job/updateJob";

export const claimJob = async (uid: string, jobId: string) => {
  // update job with claim
  const jobData = await updateJob(jobId, {
    [`matchedUsers.${uid}`]: true,
    status: "claimed"
  });

  // create chat
  const { id, chat } = await createChat(uid, jobData.hirer.id, jobId);

  // log
  slack(`*Job Claimed* ${jobData.type} in ${jobData.displayLocation}`);

  return {
    jobData,
    chatData: chat,
    chatId: id
  };
};

export default async (req: any, res: any) => {
  try {
    const { uid, jobId }: { uid: string; jobId: string } = req.body;

    const { jobData, chatId, chatData } = await claimJob(uid, jobId);

    res.status(200).json({
      jobId,
      chatId,
      jobData,
      chatData
    });

    await claimNotification(uid, jobId, chatId, jobData, chatData);
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
