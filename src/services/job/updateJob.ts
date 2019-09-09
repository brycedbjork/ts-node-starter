import { auth, firestore, messaging } from "../../firebase";
import { Job } from "../../schemas/Job";
import * as Sentry from "@sentry/node";

export const updateJob = async (jobId: string, data: object) => {
  // get job entity
  const jobDoc = await firestore
    .collection("jobs")
    .doc(jobId)
    .get();
  if (!jobDoc.exists) {
    throw new Error("Job does not exist");
  }

  await firestore
    .collection("jobs")
    .doc(jobId)
    .update(data);

  const job = await firestore
    .collection("jobs")
    .doc(jobId)
    .get();
  return job.data() as Job;
};

export default async (req: any, res: any) => {
  try {
    const { jobId }: { jobId: string } = req.params;
    const { data }: { data: object } = req.body;

    const job = await updateJob(jobId, data);

    return res.status(200).json(job);

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
