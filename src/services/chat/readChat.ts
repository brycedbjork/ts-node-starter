import { getChat } from "./getChat";
import { updateChat } from "./updateChat";
import * as Sentry from "@sentry/node";

const readChat = async (uid: string, chatId: string) => {
  const chatData = await getChat(chatId);

  await updateChat(chatId, {
    [`readyBy.${uid}`]: true
  });
};

export default async (req: any, res: any) => {
  try {
    const { uid, chatId }: { uid: string; chatId: string } = req.body;

    await readChat(uid, chatId);

    return res.status(200).send();
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
