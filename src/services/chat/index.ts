import createChat from "./createChat";
import authenticate from "../../utils/authenticate";

export default {
  create: authenticate(createChat)
  // get: authenticate(getChat)
};
