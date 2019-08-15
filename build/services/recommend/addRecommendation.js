"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addRecommendation = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addRecommendation =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, forUser) {
    var recommendingUser, recommendedUser, newRecommendation, addedRecommendation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, "hirer");

          case 2:
            recommendingUser = _context.sent;
            _context.next = 5;
            return (0, _getUser.getUser)(forUser, "student");

          case 5:
            recommendedUser = _context.sent;
            // construct recommendation
            newRecommendation = {
              by: {
                id: uid,
                firstName: recommendingUser.firstName,
                image: recommendingUser.image
              },
              user: {
                id: forUser,
                firstName: recommendedUser.firstName,
                image: recommendedUser.image
              },
              date: (0, _moment["default"])().format(),
              time: (0, _moment["default"])().unix()
            };
            _context.next = 9;
            return _firebase.firestore.collection("recommendations").add(newRecommendation);

          case 9:
            addedRecommendation = _context.sent;
            return _context.abrupt("return", {
              id: addedRecommendation.id,
              recommendation: newRecommendation
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addRecommendation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addRecommendation = addRecommendation;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, forUser, _ref3, id, recommendation;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, forUser = _req$body.forUser;
            _context2.next = 4;
            return addRecommendation(uid, forUser);

          case 4:
            _ref3 = _context2.sent;
            id = _ref3.id;
            recommendation = _ref3.recommendation;
            // successful post
            res.status(200).json({
              id: id,
              recommendation: recommendation
            });
            _context2.next = 15;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=addRecommendation.js.map