"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUser = require("../../user/getUser");

var _getJob = require("../../job/getJob");

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_mail["default"].setApiKey(process.env.SENDGRID_KEY);

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var uid, type, userEmail, jobId, jobData, chatId, message, fromData, userData, requestData, requestId, link, referral, emails, _userData, userPromises, usersData, newMessage;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uid = options.uid, type = options.type, userEmail = options.userEmail, jobId = options.jobId, jobData = options.jobData, chatId = options.chatId, message = options.message, fromData = options.fromData, userData = options.userData, requestData = options.requestData, requestId = options.requestId, link = options.link, referral = options.referral; // create array of email addresses to send to

            emails = [];

            if (userEmail) {
              _context.next = 17;
              break;
            }

            if (!(typeof uid === "string")) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return (0, _getUser.getUser)(uid, null);

          case 6:
            _userData = _context.sent;
            emails.push(_userData.email);
            _context.next = 15;
            break;

          case 10:
            userPromises = uid.map(function (singleId) {
              return (0, _getUser.getUser)(singleId, null);
            });
            _context.next = 13;
            return Promise.all(userPromises);

          case 13:
            usersData = _context.sent;
            emails = usersData.map(function (user) {
              return user.email;
            });

          case 15:
            _context.next = 18;
            break;

          case 17:
            emails = typeof userEmail === "string" ? [userEmail] : userEmail;

          case 18:
            _context.t0 = type;
            _context.next = _context.t0 === "nearbyJob" ? 21 : _context.t0 === "newMessage" ? 29 : _context.t0 === "recommendationRequest" ? 37 : _context.t0 === "invitedJob" ? 41 : _context.t0 === "referral" ? 45 : 47;
            break;

          case 21:
            if (jobId) {
              _context.next = 23;
              break;
            }

            throw new Error("No job specified");

          case 23:
            if (jobData) {
              _context.next = 27;
              break;
            }

            _context.next = 26;
            return (0, _getJob.getJob)(jobId);

          case 26:
            jobData = _context.sent;

          case 27:
            newMessage = {
              to: emails,
              from: "no-reply@hireastudent.org",
              templateId: "d-5ce99e0ba4bf45e189fcf9b8cf25b111",
              dynamicTemplateData: {
                jobId: jobId,
                jobData: jobData,
                timing: jobData.timing == "flexible" ? "flexible" : (0, _moment["default"])(jobData.timing).format("dddd MMMM D h:mma")
              }
            };
            return _context.abrupt("break", 47);

          case 29:
            if (jobId) {
              _context.next = 31;
              break;
            }

            throw new Error("No job specified");

          case 31:
            if (jobData) {
              _context.next = 35;
              break;
            }

            _context.next = 34;
            return (0, _getJob.getJob)(jobId);

          case 34:
            jobData = _context.sent;

          case 35:
            newMessage = {
              to: emails,
              from: "no-reply@hireastudent.org",
              templateId: "d-db778208d3e64368957adc5e491fc7f3",
              dynamicTemplateData: {
                chatId: chatId,
                fromData: fromData,
                message: message
              }
            };
            return _context.abrupt("break", 47);

          case 37:
            if (requestData) {
              _context.next = 39;
              break;
            }

            throw new Error("No request passed");

          case 39:
            newMessage = {
              to: emails,
              from: "no-reply@hireastudent.org",
              templateId: "d-0d5ed9a2a06046f695b2573fc900c54b",
              dynamicTemplateData: {
                from: requestData.from,
                user: userData,
                message: requestData.message,
                requestId: requestId
              }
            };
            return _context.abrupt("break", 47);

          case 41:
            if (jobId) {
              _context.next = 43;
              break;
            }

            throw new Error("No job passed");

          case 43:
            newMessage = {
              to: emails,
              from: "no-reply@hireastudent.org",
              templateId: "d-06ed5191499b4f32addd67e1cf7a4f5b",
              dynamicTemplateData: {
                jobId: jobId,
                jobData: jobData,
                timing: jobData.timing == "flexible" ? "flexible" : (0, _moment["default"])(jobData.timing).format("dddd MMMM D h:mma")
              }
            };
            return _context.abrupt("break", 47);

          case 45:
            newMessage = {
              to: emails,
              from: "no-reply@hireastudent.org",
              templateId: "d-2e3c891fc35245d888ab35a552df00cc",
              dynamicTemplateData: {
                link: link,
                referral: referral
              }
            };
            return _context.abrupt("break", 47);

          case 47:
            _context.next = 49;
            return _mail["default"].sendMultiple(newMessage);

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=email.js.map