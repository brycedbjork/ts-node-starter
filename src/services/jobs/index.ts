import getNearbyJobs from "./getNearbyJobs";
import getMyJobs from "./getMyJobs";
import authenticate from "../../utils/authenticate";

export default {
  getMyJobs: authenticate(getMyJobs),
  getNearbyJobs: authenticate(getNearbyJobs)
};
