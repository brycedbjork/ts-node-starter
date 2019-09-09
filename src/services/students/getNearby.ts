import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import { firestore } from "../../firebase";

/*
Gets nearby students
*/

export const getNearby = async (uid: string, jobType: string, radius: number) => {};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      radius,
      jobType
    }: {
      uid: string;
      radius: number;
      jobType: string;
    } = req.body;

    await getNearby(uid, jobType, radius);

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
