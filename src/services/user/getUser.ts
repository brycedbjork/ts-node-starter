import { firestore } from "../../firebase";
import * as Sentry from "@sentry/node";
import { Student, Hirer } from "../../schemas/User";

export async function getUser(id: string, type: "student"): Promise<Student>;
export async function getUser(id: string, type: "hirer"): Promise<Hirer>;
export async function getUser(id: string, type: null): Promise<Student | Hirer>;
export async function getUser(id: any, type: any): Promise<any> {
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
      return <Student>data;

    case "hirer":
      return <Hirer>data;

    default:
      return <Student | Hirer>data;
  }
}

export default async (req: any, res: any) => {
  try {
    const { uid }: { uid: string } = req.params;

    const userData = await getUser(uid, null);

    // TODO: filter data sent to client

    return res.status(200).json({ data: userData });

    // success
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
