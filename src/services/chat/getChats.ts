import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { firestore } from "../../firebase";
import { Chat } from "../../schemas/Chat";

/*
Gets user's chats 
*/

export const getChats = async (uid: string) => {
  let chats: { [chatId: string]: Chat } = {};

  const userData = await getUser(uid, null);

  const field = userData.type == "hirer" ? "hirer.id" : "users.id.active";
  const value = userData.type == "hirer" ? uid : true;

  const querySnap = await firestore
    .collection("chats")
    .where(field, "==", value)
    .get();

  querySnap.docs.forEach(doc => {
    chats[doc.id] = { id: doc.id, ...doc.data() } as Chat;
  });
  return chats;
};

export default async (req: any, res: any) => {
  try {
    const {
      uid
    }: {
      uid: string;
    } = req.params;

    const chats = await getChats(uid);

    // successful post
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
