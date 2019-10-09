import { firestore } from "../../firebase";
import admin from "firebase-admin";
import moment from "moment";
import { NewStudent, Student, NewHirer, Hirer } from "../../schemas/User";
import * as Sentry from "@sentry/node";
import slack from "../../utils/slack";
import { purePhone } from "../../utils/formatPhone";
import matchReferral from "../refer/matchReferral";
import createCustomer from "../pay/createCustomer";

export async function createUser(uid: string, data: NewStudent, type: "student"): Promise<Student>;
export async function createUser(uid: string, data: NewHirer, type: "hirer"): Promise<Hirer>;
export async function createUser(
  uid: string,
  data: NewStudent | NewHirer,
  type: "student" | "hirer"
) {
  // get user doc
  const userDoc = await firestore
    .collection("users")
    .doc(uid)
    .get();
  if (userDoc.exists) {
    throw "User already exists";
  }

  const displayLocation = `${data.city}${data.state ? `, ${data.state}` : ""}${
    !data.state && data.country ? `, ${data.country}` : ""
  }`;

  const phoneNumber = purePhone(data.phoneNumber);

  // construct and set user data
  let newUser: any;
  if (data.type == "student") {
    // student signup
    const initNotifications = {
      jobs: {
        push: true,
        text: true,
        email: true
      },
      chat: {
        push: true,
        text: true,
        email: false
      },
      payment: {
        push: true,
        text: true,
        email: true
      }
    };
    newUser = {
      ...data,
      displayLocation,
      joinedTime: moment().unix(),
      joinedDate: moment().format(),
      jobs: {},
      notifications: initNotifications,
      locationKey: null,
      phoneNumber
    } as Student;
  } else {
    // hirer signup
    const customerId = await createCustomer(
      data.email,
      `${data.firstName} ${data.lastName}`,
      data.phoneNumber
    );
    const initNotifications = {
      jobs: {
        push: true,
        text: true,
        email: true
      },
      chat: {
        push: true,
        text: true,
        email: false
      },
      payment: {
        push: true,
        text: true,
        email: true
      }
    };
    newUser = {
      ...data,
      displayLocation,
      joinedTime: moment().unix(),
      joinedDate: moment().format(),
      customerId,
      locationKey: null,
      notifications: initNotifications
    } as Hirer;
  }

  await firestore
    .collection("users")
    .doc(uid)
    .set(newUser);

  // log signup
  slack(
    `*Signup* ${newUser.type} in ${newUser.displayLocation} _${newUser.firstName} ${newUser.lastName} ${newUser.email} ${phoneNumber}_`
  );

  // capture referral
  await matchReferral(uid, newUser);

  return newUser;
}

export default async (req: any, res: any) => {
  try {
    const { uid, data }: { uid: string; data: NewStudent | NewHirer } = req.body;

    const newUser =
      data.type == "student"
        ? await createUser(uid, data, "student")
        : await createUser(uid, data, "hirer");

    // successful signup
    res.status(200).json({
      data: newUser
    });

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
