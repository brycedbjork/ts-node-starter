"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createJob = ({
  body: {
    uid,
    token
  }
}, res) => {
  // auth.verifyIdToken(token).then(decodedToken => {
  //   if (decodedToken.uid === uid) {
  //     res.sendStatus(200)
  //   }
  // });
  res.json({
    success: true
  });
};

var _default = createJob;
exports.default = _default;
//# sourceMappingURL=createJob.js.map