import { messaging, firestore } from "../../../firebase";
import admin from "firebase-admin";
import { getUser } from "../../user/getUser";

/*
Sends out push notification(s)
*/

export default async (
  user: string | string[],
  body: string,
  title?: string
) => {
  // get all push tokens
  let getUsers = [];
  if (typeof user === "string") {
    // single user
    getUsers.push(getUser(user));
  } else {
    // multiple users
    user.forEach(uid => {
      getUsers.push(getUser(uid));
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
    badge: "1"
  };
  if (title) notification.title = title;
  const payload: admin.messaging.MessagingPayload = { notification };

  // send push
  if (pushTokens.length > 0) {
    await messaging.sendToDevice(pushTokens, payload);
  }
};
