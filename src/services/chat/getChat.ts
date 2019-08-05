import { firestore } from "../../firebase";
import { Chat } from "../../schemas/Chat";
import * as Sentry from "@sentry/node";

export const getChat = async (id: string) => {
  // get job entity
  const chatDoc = await firestore
    .collection("chats")
    .doc(id)
    .get();
  if (!chatDoc.exists) {
    throw new Error("Chat does not exist");
  }

  return {
    ...chatDoc.data(),
    id
  } as Chat;
};

export default async (req: any, res: any) => {
  try {
    const { id }: { id: string } = req.params;
    const data = await getChat(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
