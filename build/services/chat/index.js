"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createChat = _interopRequireDefault(require("./createChat"));

var _getChat = _interopRequireDefault(require("./getChat"));

var _updateChat = _interopRequireDefault(require("./updateChat"));

var _deleteChat = _interopRequireDefault(require("./deleteChat"));

var _sendMessage = _interopRequireDefault(require("./sendMessage"));

var _authenticate = _interopRequireDefault(require("../../utils/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  create: (0, _authenticate["default"])(_createChat["default"]),
  get: (0, _authenticate["default"])(_getChat["default"]),
  "delete": (0, _authenticate["default"])(_deleteChat["default"]),
  sendMessage: (0, _authenticate["default"])(_sendMessage["default"]),
  update: (0, _authenticate["default"])(_updateChat["default"])
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map