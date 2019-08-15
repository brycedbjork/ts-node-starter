"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.claimJob = void 0;

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _slack = _interopRequireDefault(require("../../utils/slack"));

var _claimNotification = _interopRequireDefault(require("../notification/claimNotification"));

var _createChat = require("../chat/createChat");

var _updateJob2 = require("../job/updateJob");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var claimJob =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, jobId) {
    var _updateJob;

    var jobData, _ref2, id, chat;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _updateJob2.updateJob)(jobId, (_updateJob = {}, _defineProperty(_updateJob, "matchedUsers.".concat(uid), true), _defineProperty(_updateJob, "status", "claimed"), _updateJob));

          case 2:
            jobData = _context.sent;
            _context.next = 5;
            return (0, _createChat.createChat)(uid, jobData.hirer.id, jobId);

          case 5:
            _ref2 = _context.sent;
            id = _ref2.id;
            chat = _ref2.chat;
            // log
            (0, _slack["default"])("*Job Claimed* ".concat(jobData.type, " in ").concat(jobData.displayLocation));
            return _context.abrupt("return", {
              jobData: jobData,
              chatData: chat,
              chatId: id
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function claimJob(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.claimJob = claimJob;

var _default =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, jobId, _ref4, jobData, chatId, chatData;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, jobId = _req$body.jobId;
            _context2.next = 4;
            return claimJob(uid, jobId);

          case 4:
            _ref4 = _context2.sent;
            jobData = _ref4.jobData;
            chatId = _ref4.chatId;
            chatData = _ref4.chatData;
            res.status(200).json({
              jobId: jobId,
              chatId: chatId,
              jobData: jobData,
              chatData: chatData
            });
            _context2.next = 11;
            return (0, _claimNotification["default"])(uid, jobId, chatId, jobData, chatData);

          case 11:
            _context2.next = 18;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send(_context2.t0);
            console.log("Error: " + _context2.t0);
            Sentry.captureException(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=claimJob.js.map