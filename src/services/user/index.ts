import getUser from "./getUser";
import createUser from "./createUser";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";
import locateUser from "./locateUser";
import authenticate from "../../utils/authenticate";

export default {
  get: getUser,
  create: authenticate(createUser), // user is already auth'd when they write account data to uid
  update: authenticate(updateUser),
  delete: authenticate(deleteUser),
  location: authenticate(locateUser)
};
