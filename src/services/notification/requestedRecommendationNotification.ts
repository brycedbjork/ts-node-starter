import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import { RecommendationRequest } from "../../schemas/Recommend";
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";
import { getChat } from "../chat/getChat";
import push from "./helpers/push";
import text from "./helpers/text";
import email from "./helpers/email";
import { Student, Hirer } from "../../schemas/User";

/*
Sends notification to person whose recommendation was requested
*/

export default async (
  requestId: string,
  recomendationRequest: RecommendationRequest,
  userData: Student
) => {
  await text({
    message: `${userData.firstName} ${
      userData.lastName
    } asked that you recommend them on Hire\nhireastudent.org/recommend/${requestId}`,
    userPhoneNumber: recomendationRequest.from.phoneNumber
  });

  await email({
    type: "recommendationRequest",
    userEmail: recomendationRequest.from.email,
    requestData: recomendationRequest,
    userData,
    requestId
  });
};
