import createChat from "./createChat";
import getChat from "./getChat";
import getChats from "./getChats";
import updateChat from "./updateChat";
import deleteChat from "./deleteChat";
import sendMessage from "./sendMessage";
import authenticate from "../../utils/authenticate";

export default {
  create: authenticate(createChat),
  get: authenticate(getChat),
  getChats: authenticate(getChats),
  delete: authenticate(deleteChat),
  sendMessage: authenticate(sendMessage),
  update: authenticate(updateChat)
};
