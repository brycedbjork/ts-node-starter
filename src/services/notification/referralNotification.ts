import { WebReferral, DirectReferral } from "../../schemas/Refer";
import text from "./helpers/text";
import email from "./helpers/email";

const DOWNLOAD_LINK = "https://apps.apple.com/app/id1403752736";

export default async (referral: WebReferral | DirectReferral) => {
  let message: string;
  switch (referral.type) {
    case "direct":
      message = `${referral.user.firstName} invited you to Hire`;
      if (referral.phoneNumber) {
        await text({
          userPhoneNumber: referral.phoneNumber,
          message: `${message}\n${DOWNLOAD_LINK}`
        });
      }
      if (referral.email) {
        await email({
          userEmail: referral.email,
          type: "referral",
          link: DOWNLOAD_LINK,
          referral
        });
      }
      break;

    case "web":
      message = `Download the Hire app`;
      await text({
        userPhoneNumber: referral.phoneNumber,
        message: `${message}\n${DOWNLOAD_LINK}`
      });
      break;
  }
};
