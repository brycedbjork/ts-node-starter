import { firestore } from "../../firebase";
import * as Sentry from "@sentry/node";
import { Student, Hirer, BaseUser } from "../../schemas/User";

export const getUser = async (id: string, type?: "student" | "hirer") => {
  // get user entity
  const userDoc = await firestore
    .collection("users")
    .doc(id)
    .get();
  if (!userDoc.exists) {
    throw new Error("User does not exist");
  }

  const data = {
    ...userDoc.data(),
    id
  };

  switch (type) {
    case "student":
      return data as Student;

    case "hirer":
      return data as Hirer;

    default:
      return data as BaseUser;
  }
};

export default async (req: any, res: any) => {
  try {
    const { id }: { id: string } = req.params;

    const userData = await getUser(id);

    // TODO: filter data sent to client

    return res.status(200).json(userData);

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
