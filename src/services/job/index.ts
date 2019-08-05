import claimJob from "./claimJob";
import createJob from "./createJob";
import deleteJob from "./deleteJob";
import getJob from "./getJob";
import updateJob from "./updateJob";
import authenticate from "../../utils/authenticate";

export default {
  claim: authenticate(claimJob),
  create: authenticate(createJob),
  delete: authenticate(deleteJob),
  get: getJob,
  update: authenticate(updateJob)
};
