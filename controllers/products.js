const Product = require("../models/product");
const { USER_OK } = require("../utils/errorConstants");
const { defaultImage } = require("../utils/defaultConstants");
const NotFoundError = require("../middlewares/notFoundError");
const ForbiddenError = require("../middlewares/forbiddenError");
const BadRequestError = require("../middlewares/badRequestError");

module.exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.status(USER_OK).send(products);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createProduct = (req, res, next) => {
  let { subcat1, subcat2, image } = req.body;
  const { name, price, description, category } = req.body;
  if (!subcat1) {
    subcat1 = "all";
  }
  if (!subcat2) {
    subcat2 = "all";
  }
  if (!image) {
    image = defaultImage;
  }

  Product.create({
    name,
    price,
    description,
    category,
    subcat1,
    subcat2,
    image,
    owner: req.user._id,
  })
    .then((product) => {
      res.status(USER_OK).send({ data: product });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad request"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteProduct = (req, res, next) => {
  Product.findById(req.params.ProductId)
    .then((product) => {
      if (!product) {
        next(new NotFoundError("Item was not found"));
      }

      if (String(product.owner) !== req.user._id) {
        next(new ForbiddenError("Not authorized."));
      }

      return Product.findByIdAndRemove(req.params.ProductId)
        .orFail()
        .then((deletedProduct) =>
          res.status(USER_OK).send({ data: deletedProduct })
        )
        .catch(() => {
          next(new NotFoundError("Items not found."));
        });
    })
    .catch((err) => {
      next(err);
    });
};
