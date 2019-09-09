import getNearby from "./getNearby";
import authenticate from "../../utils/authenticate";

export default {
  getNearby: authenticate(getNearby)
};
