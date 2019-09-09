import { messaging, firestore } from "../../firebase";
import admin from "firebase-admin";
import { Job } from "../../schemas/Job";
import { getJob } from "../job/getJob";
import { getUser } from "../user/getUser";
import { getChat } from "../chat/getChat";
import push from "./helpers/push";
import text from "./helpers/text";
import email from "./helpers/email";
import { Chat } from "../../schemas/Chat";
import { Student, Hirer } from "../../schemas/User";

/*
Sends notification to users about payment
*/

export default async (
  to: Student,
  from: Hirer,
  referrals: any[], // array of student or hirer user data
  amount: number,
  jobType: string
) => {
  // notification to hirer
  if (
    from.notifications &&
    from.notifications.payment &&
    from.notifications.payment.push
  ) {
    await push({
      uid: <string>from.id,
      body: `You successfully paid ${to.firstName} ${to.lastName} $${amount}`
    });
  }
  if (
    from.notifications &&
    from.notifications.payment &&
    from.notifications.payment.email
  ) {
    await email({
      type: "successfulPayment"
      // more props
    });
  }
  if (
    from.notifications &&
    from.notifications.payment &&
    from.notifications.payment.text
  ) {
    await text({
      userPhoneNumber: from.phoneNumber,
      message: `You successfully paid ${to.firstName} ${to.lastName} $${amount}`
    });
  }

  // notification to student
  if (
    to.notifications &&
    to.notifications.payment &&
    to.notifications.payment.push
  ) {
    await push({
      uid: <string>to.id,
      body: `${from.firstName} ${from.lastName} paid you $${amount}`
    });
  }
  if (
    to.notifications &&
    to.notifications.payment &&
    to.notifications.payment.email
  ) {
    await email({
      type: "receivedPayment"
      // more props
    });
  }
  if (
    to.notifications &&
    to.notifications.payment &&
    to.notifications.payment.text
  ) {
    await text({
      userPhoneNumber: to.phoneNumber,
      message: `${from.firstName} ${from.lastName} paid you $${amount}`
    });
  }

  referrals.forEach(async referral => {
    // notification to referrers
    if (
      referral.notifications &&
      referral.notifications.referral &&
      referral.notifications.referral.push
    ) {
      await push({
        uid: <string>referral.id,
        body: `You earned $1 from a Hire referral`,
        badge: 0
      });
    }
    if (
      referral.notifications &&
      referral.notifications.referral &&
      referral.notifications.referral.email
    ) {
      await email({
        type: "earnedCommission"
        // more props
      });
    }
    if (
      referral.notifications &&
      referral.notifications.referral &&
      referral.notifications.referral.text
    ) {
      await text({
        userPhoneNumber: referral.phoneNumber,
        message: `You earned $1 from a Hire referral`
      });
    }
  });
};
