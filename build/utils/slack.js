"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(text) {
  _axios["default"].post(String(process.env.SLACK_WEBHOOK), {
    text: text
  });
};

exports["default"] = _default;
//# sourceMappingURL=slack.js.map