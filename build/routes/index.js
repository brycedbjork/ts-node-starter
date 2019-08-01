"use strict";

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = app => {
  app.route("/about").get(_controller.default.about); // app.route("/syncLocations").post(controller.syncLocations);
  // app.route("/fetchLocations").post(controller.fetchLocations);
};
//# sourceMappingURL=index.js.map