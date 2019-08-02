import axios from "axios";

export default (text: string) => {
  axios.post(String(process.env.SLACK_WEBHOOK), {
    text
  });
};
