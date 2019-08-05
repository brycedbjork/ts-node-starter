import { firestore } from "../../firebase";
import { Job } from "../../schemas/Job";
import * as Sentry from "@sentry/node";

export const getJob = async (id: string) => {
  // get job entity
  const jobDoc = await firestore
    .collection("jobs")
    .doc(id)
    .get();
  if (!jobDoc.exists) {
    throw new Error("Job does not exist");
  }

  return jobDoc.data() as Job;
};

export default async (req: any, res: any) => {
  try {
    const { id }: { id: string } = req.params;
    const data = await getJob(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
