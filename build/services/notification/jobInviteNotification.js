"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getJob = require("../job/getJob");

var _getUser = require("../user/getUser");

var _push = _interopRequireDefault(require("./helpers/push"));

var _text = _interopRequireDefault(require("./helpers/text"));

var _email = _interopRequireDefault(require("./helpers/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
Sends out notification for job to invited students
*/
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(jobId, jobData) {
    var userPromises, invitedStudents, toBePushed, toBeTexted, numbers, toBeEmailed, emails;
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
            if (jobData.invited) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            // get invited students
            userPromises = Object.keys(jobData.invited).map(function (user) {
              return (0, _getUser.getUser)(user, "student");
            });
            _context.next = 9;
            return Promise.all(userPromises);

          case 9:
            invitedStudents = _context.sent;
            // construct notification calls
            toBePushed = [];
            toBeTexted = [];
            numbers = [];
            toBeEmailed = [];
            emails = [];
            invitedStudents.forEach(function (student) {
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
            _context.next = 18;
            return (0, _push["default"])({
              uid: toBePushed,
              body: "".concat(jobData.hirer.firstName, " invited you to do a ").concat(jobData.type, " job"),
              data: {
                jobId: jobId
              }
            });

          case 18:
            _context.next = 20;
            return (0, _text["default"])({
              uid: toBeTexted,
              message: "".concat(jobData.hirer.firstName, " invited you to do a ").concat(jobData.type, " job\nhireastudent.org/job/").concat(jobId),
              userPhoneNumber: numbers
            });

          case 20:
            _context.next = 22;
            return (0, _email["default"])({
              uid: toBeEmailed,
              type: "invitedJob",
              userEmail: emails,
              jobId: jobId,
              jobData: jobData
            });

          case 22:
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
//# sourceMappingURL=jobInviteNotification.js.map