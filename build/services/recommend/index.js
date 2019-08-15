"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addRecommendation = _interopRequireDefault(require("./addRecommendation"));

var _requestRecommendation = _interopRequireDefault(require("./requestRecommendation"));

var _authenticate = _interopRequireDefault(require("../../utils/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  add: (0, _authenticate["default"])(_addRecommendation["default"]),
  request: (0, _authenticate["default"])(_requestRecommendation["default"])
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map