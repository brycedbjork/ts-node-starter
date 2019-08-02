"use strict";

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = app => {
  app.route("/about").get(_controllers.default.about);
  app.route("/job/create").get(_controllers.default.job.create); // app.route("/fetchLocations").post(controller.fetchLocations);
};
//# sourceMappingURL=index.js.map