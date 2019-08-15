"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
Sentry.init({
  dsn: "https://082068a8bf0448c59553b27f669c2a83@sentry.io/1487120"
});
app.use((0, _morgan["default"])("dev")); // app.use(express.json());

app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  extended: true
})); // app.use(cookieParser());

(0, _routes["default"])(app);
app.listen(port, function () {
  console.log("Server started on port: " + port);
}); // export default app;
//# sourceMappingURL=app.js.map