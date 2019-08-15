"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createReview = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createReview =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, forUser, review, rating, jobType, jobId) {
    var reviewingUser, reviewedUser, jobObj, newReview, addedReview;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, "hirer");

          case 2:
            reviewingUser = _context.sent;
            _context.next = 5;
            return (0, _getUser.getUser)(forUser, "student");

          case 5:
            reviewedUser = _context.sent;
            // construct review
            jobObj = {
              type: jobType
            };
            if (jobId) jobObj.id = jobId;
            newReview = {
              by: {
                id: uid,
                firstName: reviewingUser.firstName,
                image: reviewingUser.image
              },
              user: {
                id: forUser,
                firstName: reviewedUser.firstName,
                image: reviewedUser.image
              },
              date: (0, _moment["default"])().format(),
              time: (0, _moment["default"])().unix(),
              rating: rating,
              review: review,
              job: jobObj
            }; // add review

            _context.next = 11;
            return _firebase.firestore.collection("reviews").add(newReview);

          case 11:
            addedReview = _context.sent;
            return _context.abrupt("return", {
              id: addedReview.id,
              reviewData: newReview
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createReview(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.createReview = createReview;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, forUser, jobId, jobType, review, rating, _ref3, id, reviewData;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, forUser = _req$body.forUser, jobId = _req$body.jobId, jobType = _req$body.jobType, review = _req$body.review, rating = _req$body.rating;
            _context2.next = 4;
            return createReview(uid, forUser, review, rating, jobType, jobId);

          case 4:
            _ref3 = _context2.sent;
            id = _ref3.id;
            reviewData = _ref3.reviewData;
            // successful post
            res.status(200).json({
              id: id,
              review: reviewData
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

  return function (_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=createReview.js.map