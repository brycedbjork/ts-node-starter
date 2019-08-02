import controller from "./controller";

export default (app: any) => {
  app.route("/about").get(controller.about);
  app.route("/job/create").get(controller.job.create);
  // app.route("/fetchLocations").post(controller.fetchLocations);
};
