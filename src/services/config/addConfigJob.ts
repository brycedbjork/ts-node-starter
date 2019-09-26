import { firestore } from "../../firebase";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";
import express from "express";

export const addConfigJob = async (job: ConfigJob) => {
  // add configuration to database
  await firestore.collection("config").add(job);
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const { job }: { job: ConfigJob } = req.body;
    const config = await addConfigJob(job);
    return res.status(200).json({ config });
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
