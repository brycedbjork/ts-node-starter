import { auth, firestore, messaging } from "../../firebase";
import * as Sentry from "@sentry/node";
import { Chat, Message } from "../../schemas/Chat";
import { getUser } from "../user/getUser";
import { updateChat } from "../chat/updateChat";
import { getChat } from "../chat/getChat";
import moment from "moment";
import chatNotification from "../notification/chatNotification";

export default async (chatId: string, text: string) => {
  // construct message
  const message: Message = {
    type: "activity",
    text,
    time: moment().unix(),
    date: moment().format()
  };

  // add activity to messages subcollection of chat
  await firestore
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  // update chat's last message
  await updateChat(chatId, {
    lastMessage: message
  });
};
