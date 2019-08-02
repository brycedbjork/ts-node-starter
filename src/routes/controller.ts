import job from "../services/job";

export default {
  about: function(req, res) {
    var aboutInfo = {
      name: "has-api",
      version: "1.0"
    };
    res.json(aboutInfo);
  },
  job
};
