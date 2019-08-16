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
) => {};
