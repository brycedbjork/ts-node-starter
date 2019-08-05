import { getUser } from "../../user/getUser";
import { getJob } from "../../job/getJob";
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(<string>process.env.SENDGRID_KEY);

export default async (
  uid: string | string[],
  type: "job" | "chat" | "claimed",
  userEmail?: string | string[],
  jobId?: string,
  jobData?: object
) => {
  // create array of email addresses to send to
  let emails = [];
  if (!userEmail) {
    if (typeof uid === "string") {
      // single user
      const userData = await getUser(uid);
      emails.push(userData.email);
    } else {
      const userPromises = uid.map(singleId => getUser(singleId));
      const usersData = await Promise.all(userPromises);
      emails = usersData.map(user => user.email);
    }
  } else {
    emails = typeof userEmail === "string" ? [userEmail] : userEmail;
  }

  switch (type) {
    case "job":
      // nearby job notification
      if (!jobId) throw new Error("No job specified");
      if (!jobData) {
        jobData = await getJob(jobId);
      }
      const message = {
        to: emails,
        from: "no-reply@hireastudent.org",
        templateId: "d-5ce99e0ba4bf45e189fcf9b8cf25b111",
        dynamic_template_data: {
          jobId,
          jobData
        }
      };
      await sendgrid.sendMultiple(message);
      break;
  }
};
