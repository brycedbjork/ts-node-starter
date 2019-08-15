import moment from "moment";
import * as Sentry from "@sentry/node";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";
import stripe from "../../stripe";

export const charge = async (
  uid: string,
  student: string,
  amount: number,
  currency: string,
  description: string,
  jobId?: string
) => {
  // get user docs
  const payingUser = await getUser(uid, "hirer");
  const receivingUser = await getUser(student, "student");

  // make sure hirer can pay
  if (!payingUser.customerId) {
    throw new Error("Hirer is not a customer");
  }
  const payingCustomer = await stripe.customers.retrieve(payingUser.customerId);
  if (!payingCustomer.default_source) {
    throw new Error("Hirer has no linked payment");
  }

  // make sure student can receive payments
  if (!receivingUser.stripeId) {
    throw new Error("Student has not linked stripe");
  }
  const receivingAccount = await stripe.accounts.retrieve(
    receivingUser.stripeId
  );
  if (!receivingAccount.charges_enabled || !receivingAccount.payouts_enabled) {
    throw new Error("Student cannot receive payments");
  }

  // charge paying user
  stripe.charges.create({
    amount,
    currency
  });

  // notify paying user

  // payout student

  // notify student

  // payout referrals

  // notify referrals

  // add payment record to database

  // add activity notification to chat
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      student,
      jobId
    }: { uid: string; student: string; jobId: string } = req.body;

    // successful post
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
