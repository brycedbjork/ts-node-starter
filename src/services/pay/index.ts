import connectStripe from "./connectStripe";
import charge from "./charge";
import addCard from "./addCard";
import authenticate from "../../utils/authenticate";

export default {
  connectStripe: authenticate(connectStripe),
  charge: authenticate(charge),
  addCard: authenticate(addCard)
};
