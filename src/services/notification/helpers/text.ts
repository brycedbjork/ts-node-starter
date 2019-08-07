import twilio from "twilio";
import { getUser } from "../../user/getUser";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioNumber = process.env.TWILIO_NUMBER; // your twilio phone number

/*
Sends text message(s)
*/

export const text = async (phoneNumber: string, message: string) => {
  const textMessage = {
    body: message,
    to: phoneNumber,
    from: twilioNumber
  };
  await client.messages.create(textMessage);
};

export interface TextOptions {
  uid?: string | string[];
  message: string;
  userPhoneNumber?: string | string[];
}
export default async (options: TextOptions) => {
  const { uid, message, userPhoneNumber } = options;
  let numbers: string[] = [];
  if (!userPhoneNumber) {
    if (typeof uid === "string") {
      // single user
      const userData = await getUser(uid, null);
      numbers.push(userData.phoneNumber);
    } else {
      // multiple users
      const userPromises = (<string[]>uid).map(singleId =>
        getUser(singleId, null)
      );
      const usersData = await Promise.all(userPromises);
      numbers = usersData.map(userData => userData.phoneNumber);
    }
  } else {
    if (typeof userPhoneNumber === "string") {
      // single user
      numbers.push(userPhoneNumber);
    } else {
      numbers = userPhoneNumber;
    }
  }

  const textPromises = numbers.map(number => text(number, message));
  await Promise.all(textPromises);
};
