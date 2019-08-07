import { firestore } from "../../firebase";
import { Review } from "../../schemas/Review";
import * as Sentry from "@sentry/node";

export const getReview = async (id: string) => {
  // get job entity
  const reviewDoc = await firestore
    .collection("reviews")
    .doc(id)
    .get();
  if (!reviewDoc.exists) {
    throw new Error("Review does not exist");
  }

  return { ...reviewDoc.data(), id } as Review;
};

export default async (req: any, res: any) => {
  try {
    const { id }: { id: string } = req.params;
    const data = await getReview(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Something broke!");
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
