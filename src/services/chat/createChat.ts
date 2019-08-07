import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { Chat } from "../../schemas/Chat";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import { Student, Hirer } from "../../schemas/User";

export const createChat = async (
  uid: string,
  otherUser: string,
  jobId?: string
) => {
  // get user docs
  const primaryUser = await getUser(uid, null);
  const secondaryUser = await getUser(otherUser, null);

  // get job
  let jobObj: any = { job: null };
  let jobData: any = {};
  if (jobId) {
    jobData = await getJob(jobId);
    jobObj.job = jobData;
  }

  // construct chat
  const hirer =
    primaryUser.type == "hirer"
      ? {
          id: uid,
          firstName: primaryUser.firstName,
          image: primaryUser.image
        }
      : {
          id: otherUser,
          firstName: secondaryUser.firstName,
          image: secondaryUser.image
        };
  const users = {
    [primaryUser.type == "hirer" ? otherUser : uid]: {
      active: true,
      firstName:
        primaryUser.type == "hirer"
          ? secondaryUser.firstName
          : primaryUser.firstName,
      image:
        primaryUser.type == "hirer" ? secondaryUser.image : primaryUser.image
    }
  };

  const newChat: Chat = {
    active: true,
    createdTime: moment().unix(),
    createdDate: moment().format(),
    hirer,
    users,
    lastMessage: {
      type: "activity",
      text: `Connected to complete ${jobId ? `${jobData.type} job` : "job"}`,
      time: moment().unix(),
      date: moment().format()
    },
    readBy: {
      [uid]: false,
      [otherUser]: false
    },
    ...jobObj
  };
  const addedChat = await firestore.collection("chats").add(newChat);

  return {
    id: addedChat.id,
    chat: newChat
  };
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      otherUser,
      jobId
    }: { uid: string; otherUser: string; jobId: string } = req.body;

    const { id, chat }: { id: string; chat: Chat } = await createChat(
      uid,
      otherUser,
      jobId
    );

    // successful post
    res.status(200).json({
      id,
      chat
    });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
