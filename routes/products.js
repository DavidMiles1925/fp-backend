const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  validateProductBody,
  validateProductId,
} = require("../middlewares/validation");

router.get("/", getProducts);
router.post("/", validateProductBody, auth, createProduct);
router.delete("/:ProductId", validateProductId, auth, deleteProduct);

module.exports = router;
