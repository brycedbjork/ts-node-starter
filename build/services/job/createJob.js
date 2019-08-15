"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createJob = void 0;

var _firebase = require("../../firebase");

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _geofirestore = require("geofirestore");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _slack = _interopRequireDefault(require("../../utils/slack"));

var _jobNotification = _interopRequireDefault(require("../notification/jobNotification"));

var _jobInviteNotification = _interopRequireDefault(require("../notification/jobInviteNotification"));

var _getUser = require("../user/getUser");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var geoFirestore = new _geofirestore.GeoFirestore(_firebase.firestore);
var geoJobLocations = geoFirestore.collection("jobLocations");

var createJob =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, data) {
    var userEntity, displayLocation, newJob, postedJob, _newJob$coordinates, latitude, longitude, indexedLocation;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, null);

          case 2:
            userEntity = _context.sent;
            // TODO: get display location from job's lat lng
            displayLocation = "".concat(userEntity.city).concat(userEntity.state ? ", ".concat(userEntity.state) : "").concat(!userEntity.state && userEntity.country ? ", ".concat(userEntity.country) : ""); // construct and post job

            newJob = _objectSpread({}, data, {
              active: true,
              postedTime: (0, _moment["default"])().unix(),
              postedDate: (0, _moment["default"])().format(),
              hirer: {
                id: uid,
                firstName: userEntity.firstName,
                image: userEntity.image
              },
              matchedUsers: {},
              displayLocation: displayLocation,
              status: "searching",
              locationKey: null
            });
            _context.next = 7;
            return _firebase.firestore.collection("jobs").add(newJob);

          case 7:
            postedJob = _context.sent;

            if (postedJob) {
              _context.next = 10;
              break;
            }

            throw new Error("Could not post job");

          case 10:
            // make coordinates searchable with geofire
            _newJob$coordinates = newJob.coordinates, latitude = _newJob$coordinates.latitude, longitude = _newJob$coordinates.longitude;
            _context.next = 13;
            return geoJobLocations.add({
              id: postedJob.id,
              type: newJob.type,
              coordinates: new _firebaseAdmin["default"].firestore.GeoPoint(latitude, longitude)
            });

          case 13:
            indexedLocation = _context.sent;

            if (indexedLocation) {
              _context.next = 16;
              break;
            }

            throw new Error("Could not index location");

          case 16:
            _context.next = 18;
            return _firebase.firestore.collection("jobs").doc(postedJob.id).update({
              locationKey: indexedLocation.id
            });

          case 18:
            // log job post
            (0, _slack["default"])("*Job Post* ".concat(newJob.type, " for ").concat(newJob.hirer.firstName, " in ").concat(newJob.displayLocation, " _").concat(newJob.description, "_"));
            return _context.abrupt("return", {
              id: postedJob.id,
              job: newJob
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createJob(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createJob = createJob;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, data, _ref3, id, job;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, data = _req$body.data;
            _context2.next = 4;
            return createJob(uid, data);

          case 4:
            _ref3 = _context2.sent;
            id = _ref3.id;
            job = _ref3.job;
            // successful post
            res.status(200).json({
              id: id,
              data: job
            });

            if (!(data.type != "test")) {
              _context2.next = 13;
              break;
            }

            _context2.next = 11;
            return (0, _jobNotification["default"])(id, job);

          case 11:
            _context2.next = 13;
            return (0, _jobInviteNotification["default"])(id, job);

          case 13:
            return _context2.abrupt("return");

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=createJob.js.map