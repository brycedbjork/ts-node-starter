"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createChat = void 0;

var _firebase = require("../../firebase");

var _moment = _interopRequireDefault(require("moment"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _getUser = require("../user/getUser");

var _getJob = require("../job/getJob");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createChat =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, otherUser, jobId) {
    var _readBy;

    var primaryUser, secondaryUser, jobObj, jobData, hirer, users, newChat, addedChat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getUser.getUser)(uid, null);

          case 2:
            primaryUser = _context.sent;
            _context.next = 5;
            return (0, _getUser.getUser)(otherUser, null);

          case 5:
            secondaryUser = _context.sent;
            // get job
            jobObj = {
              job: null
            };
            jobData = {};

            if (!jobId) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return (0, _getJob.getJob)(jobId);

          case 11:
            jobData = _context.sent;
            jobObj.job = jobData;

          case 13:
            // construct chat
            hirer = primaryUser.type == "hirer" ? {
              id: uid,
              firstName: primaryUser.firstName,
              image: primaryUser.image
            } : {
              id: otherUser,
              firstName: secondaryUser.firstName,
              image: secondaryUser.image
            };
            users = _defineProperty({}, primaryUser.type == "hirer" ? otherUser : uid, {
              active: true,
              firstName: primaryUser.type == "hirer" ? secondaryUser.firstName : primaryUser.firstName,
              image: primaryUser.type == "hirer" ? secondaryUser.image : primaryUser.image
            });
            newChat = _objectSpread({
              active: true,
              createdTime: (0, _moment["default"])().unix(),
              createdDate: (0, _moment["default"])().format(),
              hirer: hirer,
              users: users,
              lastMessage: {
                type: "activity",
                text: "Connected to complete ".concat(jobId ? "".concat(jobData.type, " job") : "job"),
                time: (0, _moment["default"])().unix(),
                date: (0, _moment["default"])().format()
              },
              readBy: (_readBy = {}, _defineProperty(_readBy, uid, false), _defineProperty(_readBy, otherUser, false), _readBy)
            }, jobObj);
            _context.next = 18;
            return _firebase.firestore.collection("chats").add(newChat);

          case 18:
            addedChat = _context.sent;
            return _context.abrupt("return", {
              id: addedChat.id,
              chat: newChat
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createChat(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createChat = createChat;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, uid, otherUser, jobId, _ref3, id, chat;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, uid = _req$body.uid, otherUser = _req$body.otherUser, jobId = _req$body.jobId;
            _context2.next = 4;
            return createChat(uid, otherUser, jobId);

          case 4:
            _ref3 = _context2.sent;
            id = _ref3.id;
            chat = _ref3.chat;
            // successful post
            res.status(200).json({
              id: id,
              chat: chat
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
//# sourceMappingURL=createChat.js.map