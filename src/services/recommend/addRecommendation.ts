import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { Recommendation } from "../../schemas/Recommend";
import { getUser } from "../user/getUser";

export const addRecommendation = async (uid: string, forUser: string) => {
  // get user docs
  const recommendingUser = await getUser(uid, "hirer");
  const recommendedUser = await getUser(forUser, "student");

  // construct recommendation
  const newRecommendation: Recommendation = {
    by: {
      id: uid,
      firstName: recommendingUser.firstName
    },
    user: {
      id: forUser,
      firstName: recommendedUser.firstName
    },
    date: moment().format(),
    time: moment().unix()
  };

  const addedRecommendation = await firestore.collection("recommendations").add(newRecommendation);
  return {
    id: addedRecommendation.id,
    recommendation: newRecommendation
  };
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      forUser
    }: {
      uid: string;
      forUser: string;
    } = req.body;

    const {
      id,
      recommendation
    }: { id: string; recommendation: Recommendation } = await addRecommendation(uid, forUser);

    // successful post
    res.status(200).json({
      id,
      recommendation: recommendation
    });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
