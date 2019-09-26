import { firestore } from "../../firebase";
import { ConfigJob, ConfigSkill } from "../../schemas/Config";
import * as Sentry from "@sentry/node";

export const getConfig = async () => {
  // get configuration from database
  const configQuery = await firestore.collection("config").get();

  let config: {
    [jobName: string]: ConfigJob;
  } = {};
  configQuery.docs.forEach(async doc => {
    const data = doc.data() as ConfigJob;
    config[data.name] = data;

    // get skills
    const skillsQuery = await firestore
      .collection("config")
      .doc(doc.id)
      .collection("skills")
      .get();
    const skills = skillsQuery.docs.map(skillDoc => {
      return {
        id: skillDoc.id,
        ...doc.data()
      } as ConfigSkill;
    });
    config[data.name].skills = skills;
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
