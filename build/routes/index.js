"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.route("/about").get(_controller["default"].about);
  app.route("/job/create").get(_controller["default"].job.create); // app.route("/fetchLocations").post(controller.fetchLocations);
};

exports["default"] = _default;
//# sourceMappingURL=index.js.map