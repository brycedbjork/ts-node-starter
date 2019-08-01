import controllers from "./controllers";

module.exports = app => {
  app.route("/about").get(controllers.about);
  // app.route("/syncLocations").post(controller.syncLocations);
  // app.route("/fetchLocations").post(controller.fetchLocations);
};
