import job from "../services/job";
import user from "../services/user";
import about from "./about";

export default (app: any) => {
  app.route("/about").get(about);
  app.route("/job/create").post(job.create);
  app.route("/job/delete").post(job.delete);
  app.route("/job/update").post(job.update);
  app.route("/job/:id").post(job.get);
  app.route("/user/:id").post(user.get);
  app.route("/user/create").post(user.create);
  app.route("/user/delete").post(user.delete);
};
