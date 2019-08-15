"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getJob = require("../job/getJob");

var _getUser = require("../user/getUser");

var _getChat = require("../chat/getChat");

var _push = _interopRequireDefault(require("./helpers/push"));

var _text = _interopRequireDefault(require("./helpers/text"));

var _email = _interopRequireDefault(require("./helpers/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
Sends notification to hirer that student has claimed their job
*/
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, jobId, chatId, jobData, chatData) {
    var claimingUser, hiringUser;
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
            if (chatData) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (0, _getChat.getChat)(chatId);

          case 7:
            chatData = _context.sent;

          case 8:
            _context.next = 10;
            return (0, _getUser.getUser)(uid, "student");

          case 10:
            claimingUser = _context.sent;
            _context.next = 13;
            return (0, _getUser.getUser)(jobData.hirer.id, "hirer");

          case 13:
            hiringUser = _context.sent;

            if (!(hiringUser.notifications && hiringUser.notifications.jobs)) {
              _context.next = 24;
              break;
            }

            if (!hiringUser.notifications.jobs.push) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return (0, _push["default"])({
              uid: uid,
              body: "".concat(claimingUser.firstName, " claimed your ").concat(jobData.type, " job"),
              data: {
                chatId: chatId
              }
            });

          case 18:
            if (!hiringUser.notifications.jobs.text) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return (0, _text["default"])({
              uid: uid,
              message: "".concat(claimingUser.firstName, " claimed your ").concat(jobData.type, " job\nhireastudent.org/chat/").concat(chatId)
            });

          case 21:
            if (!hiringUser.notifications.jobs.email) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return (0, _email["default"])({
              uid: uid,
              type: "jobClaimed",
              userEmail: hiringUser.email,
              jobId: jobId,
              jobData: jobData
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=claimNotification.js.map