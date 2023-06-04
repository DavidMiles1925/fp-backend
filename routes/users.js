const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateProfile,
  getUsers,
  addToCart,
  removeFromCart,
  updateCartTotal,
} = require("../controllers/users");
const {
  validateUserUpdate,
  validateUserId,
  validateProductId,
  validateCartTotal,
} = require("../middlewares/validation");
const NotFoundError = require("../middlewares/notFoundError");

router.get("/getusers", auth, getUsers);

router.get("/me", validateUserId, auth, getCurrentUser);
router.patch("/me", validateUserUpdate, auth, updateProfile);
router.put("/:ProductId", validateProductId, auth, addToCart);
router.delete("/:ProductId", validateProductId, auth, removeFromCart);
router.patch("/cart", validateCartTotal, auth, updateCartTotal);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
