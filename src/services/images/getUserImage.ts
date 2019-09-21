import { firestore } from "../../firebase";
import { getUser } from "../user/getUser";
import * as Sentry from "@sentry/node";
import axios from "axios";
import express from "express";

export const getUserImage = async (uid: string) => {
  // get user image
  const userData = await getUser(uid, null);
  return userData.image;
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const { uid }: { uid: string } = req.params;
    const imageUrl = await getUserImage(uid);

    if (!imageUrl) {
      // TODO: send default image
      return res.status(400).send("no user image");
    }

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "base64");
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    return res.end(buffer);
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
