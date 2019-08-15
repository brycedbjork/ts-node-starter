"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.requestRecommendation = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

var _requestedRecommendationNotification = _interopRequireDefault(require("../notification/requestedRecommendationNotification"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var requestRecommendation =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, from, message) {
    var requestingUser, newRecommendationRequest, addedRecommendationRequest;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, "student");

          case 2:
            requestingUser = _context.sent;
            // construct recommendation
            newRecommendationRequest = {
              user: {
                id: uid,
                firstName: requestingUser.firstName,
                image: requestingUser.image
              },
              from: from,
              date: (0, _moment["default"])().format(),
              time: (0, _moment["default"])().unix(),
              message: message
            };
            _context.next = 6;
            return _firebase.firestore.collection("recommendationRequests").add(newRecommendationRequest);

          case 6:
            addedRecommendationRequest = _context.sent;
            _context.next = 9;
            return (0, _requestedRecommendationNotification["default"])(addedRecommendationRequest.id, newRecommendationRequest, requestingUser);

          case 9:
            return _context.abrupt("return", {
              id: addedRecommendationRequest.id,
              recommendationRequest: newRecommendationRequest
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function requestRecommendation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.requestRecommendation = requestRecommendation;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, from, message, _ref3, id, recommendationRequest;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, from = _req$body.from, message = _req$body.message;
            _context2.next = 4;
            return requestRecommendation(uid, from, message);

          case 4:
            _ref3 = _context2.sent;
            id = _ref3.id;
            recommendationRequest = _ref3.recommendationRequest;
            // successful post
            res.status(200).json({
              id: id,
              recommendation: recommendationRequest
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

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=requestRecommendation.js.map