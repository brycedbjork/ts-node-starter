"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _job = _interopRequireDefault(require("../services/job"));

var _user = _interopRequireDefault(require("../services/user"));

var _chat = _interopRequireDefault(require("../services/chat"));

var _recommend = _interopRequireDefault(require("../services/recommend"));

var _about = _interopRequireDefault(require("./about"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  app.route("/about").get(_about["default"]);
  app.route("/job/:id").post(_job["default"].get);
  app.route("/job/create").post(_job["default"].create);
  app.route("/job/delete").post(_job["default"]["delete"]);
  app.route("/job/update").post(_job["default"].update);
  app.route("/job/claim").post(_job["default"].claim);
  app.route("/user/:id").post(_user["default"].get);
  app.route("/user/create").post(_user["default"].create);
  app.route("/user/delete").post(_user["default"]["delete"]);
  app.route("/user/update").post(_user["default"].update);
  app.route("/user/locate").post(_user["default"].locate);
  app.route("/chat/:id").post(_chat["default"].get);
  app.route("/chat/create").post(_chat["default"].create);
  app.route("/chat/delete").post(_chat["default"]["delete"]);
  app.route("/chat/update").post(_chat["default"].update);
  app.route("/chat/sendMessage").post(_chat["default"].sendMessage);
  app.route("/recommend/add").post(_recommend["default"].add);
  app.route("/recommend/request").post(_recommend["default"].request);
};

exports["default"] = _default;
//# sourceMappingURL=index.js.map