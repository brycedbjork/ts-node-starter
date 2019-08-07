import { firestore } from "../../firebase";
import { Chat } from "../../schemas/Chat";
import * as Sentry from "@sentry/node";
import { getChat } from "./getChat";

export const updateChat = async (chatId: string, data: object) => {
  const chatDoc = await firestore
    .collection("chats")
    .doc(chatId)
    .get();
  if (!chatDoc.exists) {
    throw new Error("Chat does not exist");
  }

  await firestore
    .collection("chats")
    .doc(chatId)
    .update(data);

  const updatedChat = await getChat(chatId);

  return updatedChat as Chat;
};

export default async (req: any, res: any) => {
  try {
    const { chatId, data }: { chatId: string; data: object } = req.body;

    const job = await updateChat(chatId, data);

    return res.status(200).json(job);

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
