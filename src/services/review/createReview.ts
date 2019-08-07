import { firestore } from "../../firebase";
import moment from "moment";
import * as Sentry from "@sentry/node";
import { Review } from "../../schemas/Review";
import { getUser } from "../user/getUser";
import { getJob } from "../job/getJob";

export const createReview = async (
  uid: string,
  forUser: string,
  review: string,
  rating: number,
  jobType: string,
  jobId?: string
) => {
  // get user docs
  const reviewingUser = await getUser(uid, "hirer");
  const reviewedUser = await getUser(forUser, "student");

  // construct review
  let jobObj: any = {
    type: jobType
  };
  if (jobId) jobObj.id = jobId;
  const newReview: Review = {
    by: {
      id: uid,
      firstName: reviewingUser.firstName,
      image: reviewingUser.image
    },
    user: {
      id: forUser,
      firstName: reviewedUser.firstName,
      image: reviewedUser.image
    },
    date: moment().format(),
    time: moment().unix(),
    rating,
    review,
    job: jobObj
  };

  // add review
  const addedReview = await firestore.collection("reviews").add(newReview);
  return {
    id: addedReview.id,
    reviewData: newReview
  };
};

export default async (req: any, res: any) => {
  try {
    const {
      uid,
      forUser,
      jobId,
      jobType,
      review,
      rating
    }: {
      uid: string;
      forUser: string;
      jobId: string;
      jobType: string;
      review: string;
      rating: number;
    } = req.body;

    const {
      id,
      reviewData
    }: { id: string; reviewData: Review } = await createReview(
      uid,
      forUser,
      review,
      rating,
      jobType,
      jobId
    );

    // successful post
    res.status(200).json({
      id,
      review: reviewData
    });
  } catch (error) {
    res.status(500).send(error);
    console.log("Error: " + error);
    Sentry.captureException(error);
  }
};
