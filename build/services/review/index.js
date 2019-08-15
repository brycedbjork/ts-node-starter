"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createReview = _interopRequireDefault(require("./createReview"));

var _authenticate = _interopRequireDefault(require("../../utils/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  create: (0, _authenticate["default"])(_createReview["default"])
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map