const router = require("express").Router();
const productRouter = require("./products");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserInfo,
  validateUserLoginInfo,
} = require("../middlewares/validation");
const NotFoundError = require("../middlewares/notFoundError");

router.post("/signin", validateUserLoginInfo, login);
router.post("/signup", validateUserInfo, createUser);

router.use("/products", productRouter);
router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
