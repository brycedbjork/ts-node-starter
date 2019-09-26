import { firestore } from "../../firebase";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";
import express from "express";

export const addConfigSkill = async (jobId: string, skill: ConfigSkill) => {
  // add config skill to database
  await firestore
    .collection("config")
    .doc(jobId)
    .collection("skills")
    .add(skill);
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const { jobId } = req.params;
    const { skill }: { skill: ConfigSkill } = req.body;
    const config = await addConfigSkill(jobId, skill);
    return res.status(200).json({ config });
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
