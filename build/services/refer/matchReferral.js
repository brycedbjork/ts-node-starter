"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _updateUser = require("../user/updateUser");

var _firebase = require("../../firebase");

var _formatPhone = require("../../utils/formatPhone");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
Takes uid, user entity and credits referer
*/
var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uid, user) {
    var formattedPhone, phoneMatches, emailMatches, results, match;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // find referrals that match user
            formattedPhone = (0, _formatPhone.purePhone)(user.phoneNumber);
            _context.next = 3;
            return _firebase.firestore.collection("referrals").where("phoneNumber", "==", formattedPhone).get();

          case 3:
            phoneMatches = _context.sent;
            _context.next = 6;
            return _firebase.firestore.collection("referrals").where("email", "==", user.email).get();

          case 6:
            emailMatches = _context.sent;
            results = [].concat(_toConsumableArray(phoneMatches.docs.map(function (doc) {
              return _objectSpread({
                id: doc.id
              }, doc.data());
            })), _toConsumableArray(emailMatches.docs.map(function (doc) {
              return _objectSpread({
                id: doc.id
              }, doc.data());
            }))); // only continue if we have some matches

            if (!(results.length == 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return");

          case 10:
            // sort results by time (latest referrals first)
            results.sort(function (a, b) {
              return b.time > a.time ? 1 : -1;
            }); // latest referral is the one we will match with the user

            match = results[0];

            if (!(match.user && match.user.id)) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return (0, _updateUser.updateUser)(uid, {
              referral: match.user.id
            });

          case 15:
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
//# sourceMappingURL=matchReferral.js.map