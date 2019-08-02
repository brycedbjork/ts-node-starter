import axios from "axios";

export default (text: string) => {
  axios.post(process.env.SLACK_WEBHOOK, {
    text
  });
};
