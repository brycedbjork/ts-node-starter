import controller from "./controller";

export default (app: any) => {
  app.route("/about").get(controller.about);
  app.route("/job/create").post(controller.job.create);
  // app.route("/fetchLocations").post(controller.fetchLocations);
};
