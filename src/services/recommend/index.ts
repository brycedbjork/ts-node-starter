import addRecommendation from "./addRecommendation";
import requestRecommendation from "./requestRecommendation";
import authenticate from "../../utils/authenticate";

export default {
  add: authenticate(addRecommendation),
  request: authenticate(requestRecommendation)
};
