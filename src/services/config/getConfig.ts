import { firestore } from "../../firebase";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";

export const getConfig = async () => {
  // get configuration from database
  const configQuery = await firestore.collection("config").get();

  let config: {
    [jobName: string]: ConfigJob;
  } = {};
  configQuery.docs.forEach(doc => {
    const data = doc.data() as ConfigJob;
    config[data.name] = data;
  });

  return config;
};

export default async (req: any, res: any) => {
  try {
    const config = await getConfig();
    return res.status(200).json({ config });
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
