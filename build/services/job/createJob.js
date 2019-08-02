"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("../../firebase");

var createJob = function createJob(req, res) {
  _firebase.auth.verifyIdToken(token).then(function (decodedToken) {
    if (decodedToken.uid === uid) {
      res.sendStatus(200);
    }
  });
};

var _default = createJob;
exports["default"] = _default;
//# sourceMappingURL=createJob.js.map