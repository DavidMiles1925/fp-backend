const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const UnauthorizedError = require("../middlewares/unauthorizedError");

const userSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: "false",
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "New User",
  },
  phone: {
    type: String,
    default: "0000000000",
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address.",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  address: {
    street: {
      type: String,
    },
    apt: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  cart: {
    type: Array,
  },
  cartTotal: {
    type: String,
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Incorrect email or password")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Incorrect email or password")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);

module.exports = mongoose.model("user", userSchema);
