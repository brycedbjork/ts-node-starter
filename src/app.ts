import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(cookieParser());

routes(app);

app.listen(port, function() {
  console.log("Server started on port: " + port);
});

// export default app;
