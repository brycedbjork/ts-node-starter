import job from "../services/job";
import user from "../services/user";
import chat from "../services/chat";
import recommend from "../services/recommend";
import about from "./about";

export default (app: any) => {
  app.route("/about").get(about);
  app.route("/job/:id").post(job.get);
  app.route("/job/create").post(job.create);
  app.route("/job/delete").post(job.delete);
  app.route("/job/update").post(job.update);
  app.route("/job/claim").post(job.claim);
  app.route("/user/:id").post(user.get);
  app.route("/user/create").post(user.create);
  app.route("/user/delete").post(user.delete);
  app.route("/user/update").post(user.update);
  app.route("/user/locate").post(user.locate);
  app.route("/chat/:id").post(chat.get);
  app.route("/chat/create").post(chat.create);
  app.route("/chat/delete").post(chat.delete);
  app.route("/chat/update").post(chat.update);
  app.route("/chat/sendMessage").post(chat.sendMessage);
  app.route("/recommend/add").post(recommend.add);
  app.route("/recommend/request").post(recommend.request);
};
