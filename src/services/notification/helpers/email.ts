import { getUser } from "../../user/getUser";
import { getJob } from "../../job/getJob";
import sendgrid from "@sendgrid/mail";
import { Student, Hirer } from "../../../schemas/User";
import { WebReferral, DirectReferral } from "../../../schemas/Refer";
import { Job } from "../../../schemas/Job";
import { RecommendationRequest } from "../../../schemas/Recommend";
import moment from "moment";
sendgrid.setApiKey(<string>process.env.SENDGRID_KEY);

export interface EmailOptions {
  uid?: string | string[];
  type:
    | "nearbyJob"
    | "newMessage"
    | "jobClaimed"
    | "recommendationRequest"
    | "invitedJob"
    | "referral";
  userEmail?: string | string[];
  jobId?: string;
  jobData?: object;
  chatId?: string;
  message?: string;
  fromData?: Student | Hirer;
  userData?: Student | Hirer;
  requestData?: RecommendationRequest;
  requestId?: string;
  link?: string;
  referral?: WebReferral | DirectReferral;
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
    userData,
    requestData,
    requestId,
    link,
    referral
  } = options;
  // create array of email addresses to send to
  let emails = [];
  if (!userEmail) {
    if (typeof uid === "string") {
      // single user
      const userData = await getUser(uid, null);
      emails.push(userData.email);
    } else {
      const userPromises = (<string[]>uid).map(singleId =>
        getUser(singleId, null)
      );
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
          jobData,
          timing:
            (<Job>jobData).timing == "flexible"
              ? "flexible"
              : moment((<Job>jobData).timing).format("dddd MMMM D h:mma")
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
        templateId: "d-0d5ed9a2a06046f695b2573fc900c54b",
        dynamicTemplateData: {
          from: requestData.from,
          user: userData,
          message: requestData.message,
          requestId: requestId
        }
      };
      break;

    case "invitedJob":
      // chat notification
      if (!jobId) throw new Error("No job passed");
      newMessage = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-06ed5191499b4f32addd67e1cf7a4f5b",
        dynamicTemplateData: {
          jobId,
          jobData,
          timing:
            (<Job>jobData).timing == "flexible"
              ? "flexible"
              : moment((<Job>jobData).timing).format("dddd MMMM D h:mma")
        }
      };
      break;

    case "referral":
      newMessage = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-2e3c891fc35245d888ab35a552df00cc",
        dynamicTemplateData: {
          link,
          referral
        }
      };
      break;
  }
  await sendgrid.sendMultiple(newMessage);
};
