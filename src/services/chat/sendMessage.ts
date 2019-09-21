import { auth, firestore, messaging } from "../../firebase";
import * as Sentry from "@sentry/node";
import { Chat, Message } from "../../schemas/Chat";
import { getUser } from "../user/getUser";
import { updateChat } from "../chat/updateChat";
import { getChat } from "../chat/getChat";
import moment from "moment";
import chatNotification from "../notification/chatNotification";

const sendMessage = async (uid: string, chatId: string, text: string) => {
  const userData = await getUser(uid, null);
  const chatData = await getChat(chatId);
  if (chatData.hirer.id != uid && chatData.users[uid].active != true) {
    // user cannot send message into this chat
    throw new Error("user does not have access to this chat");
  }

  // construct message
  const message: Message = {
    type: "text",
    from: {
      id: uid,
      firstName: userData.firstName
    },
    text,
    time: moment().unix(),
    date: moment().format()
  };

  // add message to messages subcollection of chat
  await firestore
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  // update chat's last message
  await updateChat(chatId, {
    lastMessage: message,
    readBy: {
      [uid]: true
    }
  });

  // notify
  const sendToUsers: string[] = Object.keys(chatData.users);
  await chatNotification(uid, userData, sendToUsers, text, chatId);
};

export default async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { uid, text }: { uid: string; text: string; chatId: string } = req.body;

    await sendMessage(uid, id, text);

    return res.status(200).send();
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
