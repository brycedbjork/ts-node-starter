"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports["default"] = void 0;

var _firebase = require("../../firebase");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getUser(_x, _x2) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, type) {
    var userDoc, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _firebase.firestore.collection("users").doc(id).get();

          case 2:
            userDoc = _context2.sent;

            if (userDoc.exists) {
              _context2.next = 5;
              break;
            }

            throw new Error("User does not exist");

          case 5:
            data = _objectSpread({}, userDoc.data(), {
              id: id
            });
            _context2.t0 = type;
            _context2.next = _context2.t0 === "student" ? 9 : _context2.t0 === "hirer" ? 10 : 11;
            break;

          case 9:
            return _context2.abrupt("return", data);

          case 10:
            return _context2.abrupt("return", data);

          case 11:
            return _context2.abrupt("return", data);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getUser.apply(this, arguments);
}

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _id, userData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.params.id;
            _context.next = 4;
            return getUser(_id, null);

          case 4:
            userData = _context.sent;
            return _context.abrupt("return", res.status(200).json(userData));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).send("Something broke!");
            console.log("Error: " + _context.t0);
            Sentry.captureException(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=getUser.js.map