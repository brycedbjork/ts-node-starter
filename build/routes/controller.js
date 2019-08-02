"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _job = _interopRequireDefault(require("../services/job"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  about: function about(req, res) {
    var aboutInfo = {
      name: "has-api",
      version: "1.0"
    };
    res.json(aboutInfo);
  },
  job: _job["default"]
};
exports["default"] = _default;
//# sourceMappingURL=controller.js.map