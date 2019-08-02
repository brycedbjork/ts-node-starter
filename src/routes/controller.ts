import job from "../services/job";

export default {
  about: function(req: { body: object }, res: any) {
    var aboutInfo = {
      name: "has-api",
      version: "1.0"
    };
    res.json(aboutInfo);
  },
  job
};
