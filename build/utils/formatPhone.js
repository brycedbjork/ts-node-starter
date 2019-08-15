"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPhone = exports.purePhone = void 0;

/*
Takes any type of phone number and turns it into +19785012350 format
*/
var purePhone = function purePhone(value) {
  var num = value.replace(/[^\d]/g, ""); // remove all decorative chars

  num = num.length > 10 ? num = "+".concat(num) : num = "+1".concat(num); // normalize country code

  return num;
};
/*
Takes any type of phone number and turns it into +1 (978) 501-2350 format
*/


exports.purePhone = purePhone;

var displayPhone = function displayPhone(value, previousValue) {
  if (!value) {
    return value;
  }

  var onlyNums = value.replace(/[^\d]/g, "");

  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return "(" + onlyNums + ") ";
    }

    if (onlyNums.length === 6) {
      return "(" + onlyNums.slice(0, 3) + ") " + onlyNums.slice(3) + "-";
    }
  }

  if (onlyNums.length <= 3) {
    return "(".concat(onlyNums);
  }

  if (onlyNums.length <= 6) {
    return "(".concat(onlyNums.slice(0, 3), ") ").concat(onlyNums.slice(3));
  }

  return "(".concat(onlyNums.slice(0, 3), ") ").concat(onlyNums.slice(3, 6), "-").concat(onlyNums.slice(6, 10));
};

exports.displayPhone = displayPhone;
//# sourceMappingURL=formatPhone.js.map