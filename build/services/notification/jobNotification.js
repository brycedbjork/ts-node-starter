"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("../../firebase");

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _geofirestore = require("geofirestore");

var _getJob = require("../job/getJob");

var _getUser = require("../user/getUser");

var _push = _interopRequireDefault(require("./helpers/push"));

var _text = _interopRequireDefault(require("./helpers/text"));

var _email = _interopRequireDefault(require("./helpers/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var geoFirestore = new _geofirestore.GeoFirestore(_firebase.firestore);
var geoUserLocations = geoFirestore.collection("userLocations");

/*
Sends out notification for job to nearby students
*/
var NOTIFICATION_RADIUS = 20; // km

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(jobId, jobData) {
    var _jobData$coordinates, latitude, longitude, query, queryResults, userPromises, nearbyStudents, toBePushed, toBeTexted, numbers, toBeEmailed, emails;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (jobData) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return (0, _getJob.getJob)(jobId);

          case 3:
            jobData = _context.sent;

          case 4:
            // pull nearby students
            _jobData$coordinates = jobData.coordinates, latitude = _jobData$coordinates.latitude, longitude = _jobData$coordinates.longitude;
            _context.next = 7;
            return geoUserLocations.near({
              center: new _firebaseAdmin["default"].firestore.GeoPoint(latitude, longitude),
              radius: NOTIFICATION_RADIUS
            }).where("type", "==", "student");

          case 7:
            query = _context.sent;
            _context.next = 10;
            return query.get();

          case 10:
            queryResults = _context.sent;
            // get nearby students
            userPromises = [];
            queryResults.forEach(function (result) {
              userPromises.push((0, _getUser.getUser)(result.id, "student"));
            });
            _context.next = 15;
            return Promise.all(userPromises);

          case 15:
            nearbyStudents = _context.sent;
            // construct notification calls
            toBePushed = [];
            toBeTexted = [];
            numbers = [];
            toBeEmailed = [];
            emails = [];
            nearbyStudents.forEach(function (student) {
              if (student.notifications && student.notifications.job) {
                if (student.notifications.job.push === true) {
                  toBePushed.push(student.id);
                }

                if (student.notifications.job.text === true) {
                  toBeTexted.push(student.id);
                  numbers.push(student.phoneNumber);
                }

                if (student.notifications.job.email === true) {
                  toBeEmailed.push(student.id);
                  emails.push(student.email);
                }
              }
            });
            _context.next = 24;
            return (0, _push["default"])({
              uid: toBePushed,
              body: "".concat(jobData.type, " job available nearby")
            });

          case 24:
            _context.next = 26;
            return (0, _text["default"])({
              uid: toBeTexted,
              message: "".concat(jobData.type, " job available nearby\nhireastudent.org/job/").concat(jobId),
              userPhoneNumber: numbers
            });

          case 26:
            _context.next = 28;
            return (0, _email["default"])({
              uid: toBeEmailed,
              type: "nearbyJob",
              userEmail: emails
            });

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=jobNotification.js.map