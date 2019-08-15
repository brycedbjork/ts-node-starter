"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _text = _interopRequireDefault(require("./helpers/text"));

var _email = _interopRequireDefault(require("./helpers/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DOWNLOAD_LINK = "https://apps.apple.com/app/id1403752736";

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(referral) {
    var message;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = referral.type;
            _context.next = _context.t0 === "direct" ? 3 : _context.t0 === "web" ? 11 : 15;
            break;

          case 3:
            message = "".concat(referral.user.firstName, " invited you to Hire");

            if (!referral.phoneNumber) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return (0, _text["default"])({
              userPhoneNumber: referral.phoneNumber,
              message: "".concat(message, "\n").concat(DOWNLOAD_LINK)
            });

          case 7:
            if (!referral.email) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return (0, _email["default"])({
              userEmail: referral.email,
              type: "referral",
              link: DOWNLOAD_LINK,
              referral: referral
            });

          case 10:
            return _context.abrupt("break", 15);

          case 11:
            message = "Download the Hire app";
            _context.next = 14;
            return (0, _text["default"])({
              userPhoneNumber: referral.phoneNumber,
              message: "".concat(message, "\n").concat(DOWNLOAD_LINK)
            });

          case 14:
            return _context.abrupt("break", 15);

          case 15:
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
//# sourceMappingURL=referralNotification.js.map