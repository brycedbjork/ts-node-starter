import { firestore } from "../../firebase";
import { getUser } from "../user/getUser";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";
import express from "express";

export const deleteConfigSkill = async (jobId: string, skillId: string, uid: string) => {
  const userData = await getUser(uid, null);
  if (!userData.admin) {
    throw "not authorized to edit config";
  }

  // delete config skill from database
  await firestore
    .collection("config")
    .doc(jobId)
    .collection("skills")
    .doc(skillId)
    .delete();
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const { jobId, skillId } = req.params;
    const { uid } = req.headers as { uid: string };
    await deleteConfigSkill(jobId, skillId, uid);
    return res.status(200).send();
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};