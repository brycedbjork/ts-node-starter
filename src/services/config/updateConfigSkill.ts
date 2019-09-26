import { firestore } from "../../firebase";
import { getUser } from "../user/getUser";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";
import express from "express";

export const updateConfigSkill = async (
  jobId: string,
  skillId: string,
  data: object,
  uid: string
) => {
  const userData = await getUser(uid, null);
  if (!userData.admin) {
    throw "not authorized to edit config";
  }

  // update config skill in database
  await firestore
    .collection("config")
    .doc(jobId)
    .collection("skills")
    .doc(skillId)
    .update(data);
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const { jobId, skillId } = req.params;
    const { data } = req.body;
    const { uid } = req.headers as { uid: string };
    await updateConfigSkill(jobId, skillId, data, uid);
    return res.status(200).send();
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
