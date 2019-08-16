import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import stripe from "../../stripe";
import payNotification from "../notification/payNotification";
import { firestore } from "../../firebase";
import addActivity from "../chat/addActivity";

/*
Hit in order to pay out student
*/

export const charge = async (
  uid: string,
  student: string,
  amount: number,
  currency: string,
  jobType: string
) => {
  // get user docs
  const payingUser = await getUser(uid, "hirer");
  const receivingUser = await getUser(student, "student");

  // make sure hirer can pay
  if (!payingUser.customerId) {
    throw new Error("Hirer is not a customer");
  }
  const payingCustomer: any = await stripe.customers.retrieve(
    payingUser.customerId
  );
  if (!payingCustomer.default_source) {
    throw new Error("Hirer has no linked payment");
  }

  // make sure student can receive payments
  if (!receivingUser.stripeId) {
    throw new Error("Student has not linked stripe");
  }
  const receivingAccount: any = await stripe.accounts.retrieve(
    receivingUser.stripeId
  );
  if (!receivingAccount.charges_enabled || !receivingAccount.payouts_enabled) {
    throw new Error("Student cannot receive payments");
  }

  // get referring users
  let referringUsers = [];
  if (payingUser.referral) {
    referringUsers.push(payingUser.referral);
  }
  if (receivingUser.referral) {
    referringUsers.push(receivingUser.referral);
  }
  const referringPromises = referringUsers.map(userId => getUser(userId, null));
  const referringUsersData = await Promise.all(referringPromises);

  // charge paying user
  const transaction = await stripe.charges.create({
    amount,
    currency,
    source: payingCustomer.default_source,
    description: `${receivingUser.firstName} ${
      receivingUser.lastName
    } - ${jobType} – hireastudent.org`
  });

  // payout student 90% of job
  const primaryTransfer = await stripe.transfers.create({
    amount: amount * 0.9,
    currency,
    destination: receivingUser.stripeId
  });
  console.log(primaryTransfer);

  // payout referrals $1 each
  referringUsersData.forEach(async user => {
    if (user.stripeId) {
      const referralTransfer = await stripe.transfers.create({
        amount: 100, // 1 dollar
        currency,
        destination: user.stripeId,
        source_transaction: transaction.id
      });
      console.log(referralTransfer);
    }
  });

  // notify student, referrals, and hirer
  await payNotification(
    receivingUser,
    payingUser,
    referringUsersData,
    amount,
    jobType
  );

  // add payment record to database
  await firestore.collection("payments").add({
    hirer: payingUser.id,
    student: receivingUser.id,
    amount,
    currency,
    jobType
  });

  // add payment to chat between hirer and student
  const chatQuery = await firestore
    .collection("chats")
    .where("hirer.id", "==", payingUser.id)
    .where(`users.${receivingUser.id}.active`, "==", true)
    .get();
  if (!chatQuery.empty) {
    const chatDoc = chatQuery.docs[0];
    // add activity notification to chat
    await addActivity(chatDoc.id, `${jobType} job payment $${amount}`);
  }
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      student,
      amount,
      currency,
      jobType
    }: {
      uid: string;
      student: string;
      amount: number;
      currency: string;
      jobType: string;
    } = req.body;

    await charge(uid, student, amount, currency, jobType);

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
