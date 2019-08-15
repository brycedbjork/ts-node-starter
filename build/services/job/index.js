"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _claimJob = _interopRequireDefault(require("./claimJob"));

var _createJob = _interopRequireDefault(require("./createJob"));

var _deleteJob = _interopRequireDefault(require("./deleteJob"));

var _getJob = _interopRequireDefault(require("./getJob"));

var _updateJob = _interopRequireDefault(require("./updateJob"));

var _authenticate = _interopRequireDefault(require("../../utils/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  claim: (0, _authenticate["default"])(_claimJob["default"]),
  create: (0, _authenticate["default"])(_createJob["default"]),
  "delete": (0, _authenticate["default"])(_deleteJob["default"]),
  get: _getJob["default"],
  update: (0, _authenticate["default"])(_updateJob["default"])
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map