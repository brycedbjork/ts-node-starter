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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  claim: _claimJob["default"],
  create: _createJob["default"],
  "delete": _deleteJob["default"],
  get: _getJob["default"],
  update: _updateJob["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map