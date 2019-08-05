import { messaging, firestore } from "../../../firebase";
import admin from "firebase-admin";
import { getUser } from "../../user/getUser";

/*
Sends out push notification(s)
*/

export interface PushOptions {
  uid: string | string[];
  body: string;
  title?: string;
  data?: object;
}
export default async (options: PushOptions) => {
  const { uid, body, title, data } = options;
  // get all push tokens
  let getUsers = [];
  if (typeof uid === "string") {
    // single user
    getUsers.push(getUser(uid));
  } else {
    // multiple users
    uid.forEach(singleId => {
      getUsers.push(getUser(singleId));
    });
  }
  const users = await Promise.all(getUsers);
  let pushTokens: string[] = [];
  users.forEach(userData => {
    if (userData.pushToken) {
      pushTokens.push(userData.pushToken);
    }
  });

  // construct payload
  let notification: any = {
    body,
    badge: "1",
    data
  };
  if (title) notification.title = title;
  const payload: admin.messaging.MessagingPayload = { notification };

  // send push
  if (pushTokens.length > 0) {
    await messaging.sendToDevice(pushTokens, payload);
  }
};
