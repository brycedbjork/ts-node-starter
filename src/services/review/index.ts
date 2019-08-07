import createReview from "./createReview";
import authenticate from "../../utils/authenticate";

export default {
  create: authenticate(createReview)
};
