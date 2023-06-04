const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { USER_OK } = require("../utils/errorConstants");

const { JWT_SECRET = "some-secret-key" } = process.env;
const NotFoundError = require("../middlewares/notFoundError");
const UnauthorizedError = require("../middlewares/unauthorizedError");
const ConflictError = require("../middlewares/conflictError");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(USER_OK).send(users))
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return new NotFoundError("User Not Found");
      }
      return res.status(USER_OK).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  let { name, phone, address, cartTotal } = req.body;
  const { email } = req.body;

  if (!name) {
    name = "New User";
  }
  if (!phone) {
    phone = "0000000000";
  }
  if (!address) {
    address = {
      street: "none",
      apt: "none",
      city: "none",
      state: "none",
      zip: "none",
    };
  }
  if (!cartTotal) {
    cartTotal = "0";
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        phone,
        email,
        password: hash,
        address,
        cartTotal,
      })
    )
    .then((user) => {
      const { password: userPassword, ...userWithoutPassword } =
        user.toObject();

      res.send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        next(new ConflictError("This username is already in use"));
      } else if (err.name === "MongoServerError") {
        next(new ConflictError("This username is already in use"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(USER_OK).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Invalid email or password."));
    });
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, phone, address } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, phone, address },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return new NotFoundError("Not found");
      }
      return res.status(USER_OK).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.addToCart = (req, res, next) => {
  const { _id, cartTotal } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { cart: _id }, cartTotal },
    { new: true }
  )
    .orFail(() => new NotFoundError("..."))
    .then((user) => {
      res.status(USER_OK).send(user);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports.removeFromCart = (req, res, next) => {
  const { _id, cartTotal } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { cart: _id }, cartTotal },
    { new: true }
  )
    .orFail(() => new NotFoundError("..."))
    .then((user) => {
      res.status(USER_OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateCartTotal = (req, res, next) => {
  const { cartTotal } = req.body;

  User.findByIdAndUpdate(req.user._id, { cartTotal }, { new: true })
    .orFail(() => new NotFoundError("..."))
    .then((user) => {
      res.status(USER_OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};
