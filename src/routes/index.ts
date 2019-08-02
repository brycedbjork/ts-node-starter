import controller from "./controller";

export default app => {
  app.route("/about").get(controller.about);
  app.route("/job/create").get(controller.job.create);
  // app.route("/fetchLocations").post(controller.fetchLocations);
};
