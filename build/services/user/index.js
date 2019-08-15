"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUser = _interopRequireDefault(require("./getUser"));

var _createUser = _interopRequireDefault(require("./createUser"));

var _updateUser = _interopRequireDefault(require("./updateUser"));

var _deleteUser = _interopRequireDefault(require("./deleteUser"));

var _locateUser = _interopRequireDefault(require("./locateUser"));

var _authenticate = _interopRequireDefault(require("../../utils/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  get: _getUser["default"],
  create: (0, _authenticate["default"])(_createUser["default"]),
  // user is already auth'd when they write account data to uid
  update: (0, _authenticate["default"])(_updateUser["default"]),
  "delete": (0, _authenticate["default"])(_deleteUser["default"]),
  locate: (0, _authenticate["default"])(_locateUser["default"])
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map