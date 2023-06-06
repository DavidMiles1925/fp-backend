const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const { PORT = 3001 } = process.env;
const { SERVER_ADDRESS = "server_address" } = process.env;

const app = express();

const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { limiter } = require("./middlewares/limiter");

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

const routes = require("./routes");

const errorHandler = require("./middlewares/error-handler");

mongoose
  .connect(`mongodb://${SERVER_ADDRESS}`)
  .then(console.log(`DB connected at ${SERVER_ADDRESS}`));

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
