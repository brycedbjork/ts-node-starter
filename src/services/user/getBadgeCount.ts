import { firestore } from "../../firebase";
import * as Sentry from "@sentry/node";
import { getUser } from "./getUser";

export async function getBadgeCount(id: string): Promise<number> {
  // get user entity
  const userData = await getUser(id, null);

  switch (userData.type) {
    case "hirer":
      // number of student responses to job

      // number of unread messages in chat

      // number of new referrals

      // number of new promotions

      return 0;

    case "student":
      // number of available opportunities

      // number of unread messages in chat

      // number of new referrals

      // number of promotions

      return 0;
  }
}

export default async (req: any, res: any) => {
  try {
    const { id }: { id: string } = req.params;

    const badgeCount = await getBadgeCount(id);

    return res.status(200).json({ count: badgeCount });

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
