import getConfig from "./getConfig";
import addConfigJob from "./addConfigJob";
import addConfigSkill from "./addConfigSkill";
import deleteConfigJob from "./deleteConfigJob";
import deleteConfigSkill from "./deleteConfigSkill";
import updateConfigJob from "./updateConfigJob";
import updateConfigSkill from "./updateConfigSkill";
import authenticate from "../../utils/authenticate";

export default {
  get: getConfig,
  addJob: authenticate(addConfigJob),
  addSkill: authenticate(addConfigSkill),
  deleteJob: authenticate(deleteConfigJob),
  deleteSkill: authenticate(deleteConfigSkill),
  updateJob: authenticate(updateConfigJob),
  updateSkill: authenticate(updateConfigSkill)
};
