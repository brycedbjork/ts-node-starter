"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3000;
app.use((0, _morgan.default)("dev")); // app.use(express.json());

app.use(_bodyParser.default.json({
  limit: "50mb"
}));
app.use(_bodyParser.default.urlencoded({
  limit: "50mb",
  extended: true
})); // app.use(cookieParser());

(0, _routes.default)(app);
app.listen(port, function () {
  console.log("Server started on port: " + port);
}); // export default app;
//# sourceMappingURL=app.js.map