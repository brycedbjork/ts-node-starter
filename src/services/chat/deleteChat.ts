import { auth, firestore, messaging } from "../../firebase";
import * as Sentry from "@sentry/node";
import { Chat } from "../../schemas/Chat";

const deleteChat = async (chatId: string) => {
  // get job entity
  const chatDoc = await firestore
    .collection("jobs")
    .doc(chatId)
    .get();
  if (!chatDoc.exists) {
    throw new Error("Chat does not exist");
  }

  // delete job itself
  await firestore
    .collection("chats")
    .doc(chatId)
    .delete();
};

export default async (req: any, res: any) => {
  try {
    const { chatId }: { chatId: string } = req.body;

    await deleteChat(chatId);

    return res.status(200).send();

    // TODO: notify matched students?

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
