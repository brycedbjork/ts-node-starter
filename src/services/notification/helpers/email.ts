import { getUser } from "../../user/getUser";
import { getJob } from "../../job/getJob";
import sendgrid from "@sendgrid/mail";
import { BaseUser } from "../../../schemas/User";
import { RecommendationRequest } from "../../../schemas/Recommend";
sendgrid.setApiKey(<string>process.env.SENDGRID_KEY);

export interface EmailOptions {
  uid?: string | string[];
  type: "nearbyJob" | "newMessage" | "jobClaimed" | "recommendationRequest";
  userEmail?: string | string[];
  jobId?: string;
  jobData?: object;
  chatId?: string;
  message?: string;
  fromData?: BaseUser;
  requestData?: RecommendationRequest;
  requestId?: string;
}
export default async (options: EmailOptions) => {
  let {
    uid,
    type,
    userEmail,
    jobId,
    jobData,
    chatId,
    message,
    fromData,
    requestData,
    requestId
  } = options;
  // create array of email addresses to send to
  let emails = [];
  if (!userEmail) {
    if (typeof uid === "string") {
      // single user
      const userData = await getUser(uid);
      emails.push(userData.email);
    } else {
      const userPromises = (<string[]>uid).map(singleId => getUser(singleId));
      const usersData = await Promise.all(userPromises);
      emails = usersData.map(user => user.email);
    }
  } else {
    emails = typeof userEmail === "string" ? [userEmail] : userEmail;
  }

  let newMessage: any;
  switch (type) {
    case "nearbyJob":
      // nearby job notification
      if (!jobId) throw new Error("No job specified");
      if (!jobData) {
        jobData = await getJob(jobId);
      }
      newMessage = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-5ce99e0ba4bf45e189fcf9b8cf25b111",
        dynamicTemplateData: {
          jobId,
          jobData
        }
      };
      break;

    case "newMessage":
      // chat notification
      if (!jobId) throw new Error("No job specified");
      if (!jobData) {
        jobData = await getJob(jobId);
      }
      newMessage = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-db778208d3e64368957adc5e491fc7f3",
        dynamicTemplateData: {
          chatId,
          fromData,
          message
        }
      };
      break;

    case "recommendationRequest":
      // chat notification
      if (!requestData) throw new Error("No request passed");
      newMessage = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-db778208d3e64368957adc5e491fc7f3",
        dynamicTemplateData: {
          from: requestData.from,
          user: requestData.user,
          message: requestData.message,
          requestId: requestId
        }
      };
      break;
  }
  await sendgrid.sendMultiple(newMessage);
};
