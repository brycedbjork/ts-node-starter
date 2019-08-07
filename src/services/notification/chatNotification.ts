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
import { BaseUser } from "../../schemas/User";

/*
Sends notification to other chat participant(s) after new message
*/

export default async (
  from: string,
  fromData: BaseUser,
  to: string[],
  message: string,
  chatId: string
) => {
  const userPromises = to.map(id => getUser(id));
  const usersData = await Promise.all(userPromises);

  let toBePushed: string[] = [];
  let toBeTexted: string[] = [];
  let numbers: string[] = [];
  let toBeEmailed: string[] = [];
  let emails: string[] = [];
  usersData.forEach(user => {
    if (user.notifications && user.notifications.chat) {
      if (user.notifications.chat.push) {
        toBePushed.push(<string>user.id);
      }
      if (user.notifications.chat.text) {
        toBeTexted.push(<string>user.id);
        numbers.push(user.phoneNumber);
      }
      if (user.notifications.chat.email) {
        toBeEmailed.push(<string>user.id);
        emails.push(user.email);
      }
    }
  });

  await push({
    uid: toBePushed,
    body: message,
    title: fromData.firstName,
    data: {
      chatId
    }
  });

  await text({
    uid: toBeTexted,
    message: `${fromData.firstName}: ${message}`,
    userPhoneNumber: numbers
  });

  await email({
    uid: toBeEmailed,
    userEmail: emails,
    type: "newMessage",
    chatId,
    fromData,
    message
  });
};
