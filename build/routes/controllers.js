"use strict";

var _job = _interopRequireDefault(require("../services/job"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: "has-api",
      version: "1.0"
    };
    res.json(aboutInfo);
  },
  job: _job.default
};
module.exports = controllers;
//# sourceMappingURL=controllers.js.map