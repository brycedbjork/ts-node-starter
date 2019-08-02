"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var updateJob = function updateJob(_ref, res) {
  var _ref$body = _ref.body,
      uid = _ref$body.uid,
      token = _ref$body.token;
  // auth.verifyIdToken(token).then(decodedToken => {
  //   if (decodedToken.uid === uid) {
  //     res.sendStatus(200)
  //   }
  // });
  res.sendStatus(200);
};

var _default = updateJob;
exports["default"] = _default;
//# sourceMappingURL=updateJob.js.map