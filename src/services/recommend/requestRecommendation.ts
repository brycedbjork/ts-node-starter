import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { RecommendationRequest } from "../../schemas/Recommend";
import { getUser } from "../user/getUser";
import requestRecommendationNotification from "../notification/requestedRecommendationNotification";

export const requestRecommendation = async (
  uid: string,
  from: { name: string; email: string; phoneNumber: string },
  message: string
) => {
  // get user docs
  const requestingUser = await getUser(uid, "student");

  // construct recommendation
  const newRecommendationRequest: RecommendationRequest = {
    user: {
      id: uid,
      firstName: requestingUser.firstName
    },
    from,
    date: moment().format(),
    time: moment().unix(),
    message
  };

  const addedRecommendationRequest = await firestore
    .collection("recommendationRequests")
    .add(newRecommendationRequest);

  // notify requested person
  await requestRecommendationNotification(
    addedRecommendationRequest.id,
    newRecommendationRequest,
    requestingUser
  );

  return {
    id: addedRecommendationRequest.id,
    recommendationRequest: newRecommendationRequest
  };
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      from,
      message
    }: {
      uid: string;
      from: {
        name: string;
        email: string;
        phoneNumber: string;
      };
      message: string;
    } = req.body;

    const {
      id,
      recommendationRequest
    }: {
      id: string;
      recommendationRequest: RecommendationRequest;
    } = await requestRecommendation(uid, from, message);

    // successful post
    res.status(200).json({
      id,
      recommendation: recommendationRequest
    });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
