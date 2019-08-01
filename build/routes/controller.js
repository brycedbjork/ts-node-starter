"use strict";

const controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: "has-api",
      version: "1.0"
    };
    res.json(aboutInfo);
  }
};
module.exports = controllers;
//# sourceMappingURL=controller.js.map