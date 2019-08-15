"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _firebase = require("../firebase");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
  wraps express routes and authenticates the passed token
*/
function _default(wrapped) {
  return (
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var req,
          res,
          uid,
          token,
          decodedToken,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = _args[0];
              res = _args[1];
              _context.prev = 2;
              uid = req.body.uid;
              token = req.body.token; // verify user is who they say they are

              _context.next = 7;
              return _firebase.auth.verifyIdToken(token);

            case 7:
              decodedToken = _context.sent;

              if (!(decodedToken.uid == uid)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", wrapped.apply(this, _args));

            case 12:
              throw new Error("decoded uid did not match passed uid");

            case 13:
              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](2);
              Sentry.captureException(_context.t0);
              return _context.abrupt("return", res.status(403).send("Could not validate token"));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 15]]);
    }))
  );
}
//# sourceMappingURL=authenticate.js.map