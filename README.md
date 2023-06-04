# 1 Project Info: Sales Site Server

This is the backend server code to work with the Final Project Sales Site frontend code.

## Links

### Frontend Repository: [Frontend Repo](https://github.com/DavidMiles1925/fp-frontend).

### Backend Repository: [Backend Repo](https://github.com/DavidMiles1925/fp-backend).

#### ..................................................

# 2 Documentation

### Table of Contents

#### 2.1 Server

**2.1.1 Dependencies**  
**2.1.2 Environement Variables**  
**2.1.3 Features**

#### 2.2 Models

**2.2.1 Product Model**  
**2.2.1 User Model**

#### 2.3 Routes

**2.3.1 Index Route**  
**2.3.1 Product Route**  
**2.3.3 User Route**

#### 2.4 Controllers

**2.4.1 Product Controllers**  
-- 2.4.1.1 getusers  
-- 2.4.1.2 createProduct  
-- 2.4.1.3 deleteProduct

**2.4.2 User Controllers**
-- 2.4.2.1 getUsers
-- 2.4.2.2 getCurrentUser
-- 2.4.2.3 createUser
-- 2.4.2.4 login
-- 2.4.2.5 updateProfile
-- 2.4.2.6 addToCart
-- 2.4.2.7 removeFromCart
-- 2.4.2.8 updateCartTotal

#### 2.5 Middlewares

**2.5.1 Authorization**
**2.5.2 Error Handling**
**2.5.3 Logging**
**2.5.4 Validation**

#### ..................................................

## 2.1 Server (app.js)

This code sets up an Express application, establishes a connection with a MongoDB database, defines routes, applies middleware for error logging and handling, and starts the server. It provides a basic structure for building a web application with error handling capabilities.

### 2.1.1 Dependencies

- **express**: Express is a popular web framework for Node.js that simplifies the process of building web applications.
- **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and provides a straightforward way to interact with the database.
- **cors**: Cors is a middleware that allows Cross-Origin Resource Sharing (CORS) in the Express application.

### 2.1.2 Environment Variables

- **PORT**: The port on which the Express application will listen. Default value is set to 3001 if not specified in the environment.

### 2.1.3 Features

#### Creating the Express Application

- An instance of the Express application is created using `express()`, which initializes a new Express application.
- The `app` variable will be used to define routes, middleware, and start the server.

#### Error Logging

- The application includes middleware for logging errors using the `errorLogger` middleware defined in "./middlewares/logger.js".
- The `errorLogger` middleware logs errors generated during the request processing.

#### Crash Test Route

- The `/crash-test` route is used for testing purposes. When accessed, it intentionally throws an error after a delay of 0 milliseconds, causing the server to crash.
- This route is helpful for testing the error handling capabilities of the application.

#### Database Connection

- The application connects to a MongoDB database using the `mongoose.connect()` method. The connection string "mongodb://127.0.0.1:27017/bmd_db" specifies the database URL.
- The connection is established, and a success message is logged to the console.

#### Middleware

- The `cors` middleware is applied using `app.use(cors())`, allowing Cross-Origin Resource Sharing in the application.
- The `express.json()` middleware is used to parse JSON data sent in the request body.

#### Request Logging

- The application includes middleware for logging incoming requests using the `requestLogger` middleware defined in "./middlewares/logger.js".
- The `requestLogger` middleware logs information about each incoming request.

#### Routes

- The application includes routes defined in the "./routes" module. These routes handle various API endpoints and define the behavior of the server for different HTTP requests.

#### Error Handling

- The application includes error handling middleware defined in the "./middlewares/error-handler.js" module.
- The `errors()` middleware from the "celebrate" library is used to handle validation errors thrown by the celebrate library.
- The `errorHandler` middleware is used to handle other types of errors and return appropriate error responses.

#### Starting the Server

- The server is started by calling the `app.listen()` method. It listens on the specified `PORT` for incoming connections.
- The server only starts if the `NODE_ENV` environment variable is not set to "test". This prevents the server from starting during testing.

## 2.2 Models

### 2.2.1 Product Model (product.js)

This code defines a Mongoose schema and model for the "product" collection. The schema specifies the structure and validation rules for the product documents stored in the database. It ensures that all required fields are present and provides a default value for the `createdAt` field. The model allows performing CRUD operations on the "product" collection, such as creating, reading, updating, and deleting products. It leverages the features provided by Mongoose to simplify database interactions and enforce data consistency.

#### Dependencies

- **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward schema-based solution for modeling and interacting with MongoDB.
- **validator**: Validator is a library that provides validation functions for validating and sanitizing strings.

#### Product Schema

- The code defines a Mongoose schema for the "product" collection in the MongoDB database.
- The schema includes the following fields:
  - `name`: The name of the product. It is a required string field.
  - `price`: The price of the product. It is a required string field.
  - `description`: The description of the product. It is a required string field.
  - `category`: The category of the product. It is a required string field.
  - `subcat1`: The first subcategory of the product. It is a required string field.
  - `subcat2`: The second subcategory of the product. It is a required string field.
  - `image`: The image URL of the product. It is a required string field.
  - `owner`: The owner of the product, represented as a reference to the "user" collection in the database. It is a required field of type `mongoose.Schema.Types.ObjectId`.
  - `createdAt`: The timestamp indicating the creation date of the product. It is a date field with a default value of the current date and time.

#### Exporting the Model

- The product schema is compiled into a Mongoose model using `mongoose.model("product", productSchema)`.
- The model is exported to be used in other modules.

### 2.2.2 User Model (user.js)

This code defines a Mongoose schema and model for the "user" collection. The schema specifies the structure and validation rules for the user documents stored in the database. It ensures that the email is unique, validates the email format, and hashes the password before storing it. The model provides functions for finding a user by their credentials and performs password comparison using bcryptjs. It enables CRUD operations on the "user" collection and encapsulates the logic related to user authentication and authorization.

#### Dependencies

- **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward schema-based solution for modeling and interacting with MongoDB.
- **bcryptjs**: Bcryptjs is a library used for hashing passwords. It provides functions for hashing and comparing passwords using bcrypt algorithm.
- **validator**: Validator is a library that provides validation functions for validating and sanitizing strings.
- **UnauthorizedError**: UnauthorizedError is a custom middleware used to handle unauthorized access errors.

#### User Schema

- The code defines a Mongoose schema for the "user" collection in the MongoDB database.
- The schema includes the following fields:
  - `admin`: A boolean field indicating whether the user is an admin. It has a default value of `false`.
  - `name`: The name of the user. It is a string field with a minimum length of 2 characters and a maximum length of 30 characters. It has a default value of "New User".
  - `phone`: The phone number of the user. It is a string field with a default value of "0000000000".
  - `email`: The email address of the user. It is a required string field and must be a valid email address. It is also marked as unique.
  - `password`: The password of the user. It is a required string field and is not selected by default (select: false) to prevent returning it in query results.
  - `address`: The address of the user. It is an object containing the following fields:
    - `street`: The street address of the user. It is a string field.
    - `apt`: The apartment number of the user. It is a string field.
    - `city`: The city of the user. It is a string field.
    - `state`: The state of the user. It is a string field.
    - `zip`: The ZIP code of the user. It is a string field.
  - `cart`: An array field representing the user's cart. It stores product items.
  - `cartTotal`: The total amount of the user's cart. It is a string field.

#### Static Method: findUserByCredentials

- The `findUserByCredentials` static method is added to the user schema to find a user by their email and password.
- It takes the `email` and `password` as parameters.
- It searches for a user with the given email in the "user" collection.
- The password is compared using bcrypt's `compare` function to verify its correctness.
- If the email or password is incorrect, it rejects the promise with an `UnauthorizedError`.
- If the email and password match, it resolves the promise with the user document.

#### Exporting the Model

- The user schema is compiled into a Mongoose model using `mongoose.model("user", userSchema)`.
- The model is exported to be used in other modules.

## 2.3 Routes

### 2.3.1 Index Route (index.js)

This code sets up a router in Express and defines various routes related to user authentication, user management, and product management. It applies middleware for user authentication, input validation, and error handling. The code provides a structure for organizing the routes and middleware in a modular and scalable way.

#### Dependencies

- **express**: Express is a popular web framework for Node.js that simplifies the process of building web applications.

#### Importing Required Modules and Middlewares

- The code imports the `Router` object from the Express module to create a new router instance.
- The `productRouter` and `userRouter` modules are imported to handle specific routes related to products and users.
- The `login` and `createUser` functions from the "../controllers/users" module are imported to handle user authentication.
- The `auth` middleware from the "../middlewares/auth" module is imported to handle user authentication and authorization.
- The `validateUserInfo` and `validateUserLoginInfo` middlewares from the "../middlewares/validation" module are imported to validate user input.
- The `NotFoundError` middleware from the "../middlewares/notFoundError" module is imported to handle routes that are not found.

#### Defining Routes

- The router object is used to define the following routes:
  - `POST /signin`: This route is used for user login. The `validateUserLoginInfo` middleware is applied to validate the user login input, and the `login` controller function is called to handle the login logic.
  - `POST /signup`: This route is used for user signup. The `validateUserInfo` middleware is applied to validate the user signup input, and the `createUser` controller function is called to handle the user creation logic.

#### Handling Product and User Routes

- The `productRouter` and `userRouter` are mounted using the `router.use()` method.
- For the "/products" route, the `productRouter` module is used to handle subroutes related to products.
- For the "/users" route, the `auth` middleware is applied to authenticate and authorize the user, and the `userRouter` module is used to handle subroutes related to users.

#### Handling Not Found Route

- A catch-all route is defined using `router.use()` to handle any requests that do not match the defined routes.
- If a route is not found, the `NotFoundError` middleware is called with the error message "Route not found".

#### Exporting the Router

- The router object is exported to be used in other modules.

### 2.3.2 Product Route (products.js)

This code sets up a router in Express specifically for product-related routes. It defines routes for retrieving all products, creating a new product, and deleting a specific product. The routes are protected with authentication middleware and apply validation middleware to ensure the correctness of the input data. The code follows a modular approach by separating the route handling logic into separate controllers and middleware functions, making it easier to maintain and extend the codebase.

#### Dependencies

- **express**: Express is a popular web framework for Node.js that simplifies the process of building web applications.

#### Importing Required Modules and Middlewares

- The code imports the `Router` object from the Express module to create a new router instance.
- The `auth` middleware from the "../middlewares/auth" module is imported to handle user authentication and authorization.
- The `getProducts`, `createProduct`, and `deleteProduct` functions from the "../controllers/products" module are imported to handle product-related operations.
- The `validateProductBody` and `validateProductId` middlewares from the "../middlewares/validation" module are imported to validate product input.

#### Defining Routes

- The router object is used to define the following routes:
  - `GET /`: This route is used to retrieve all products. The `getProducts` controller function is called to handle the retrieval logic.
  - `POST /`: This route is used to create a new product. The `validateProductBody` middleware is applied to validate the product input, the `auth` middleware is applied to authenticate and authorize the user, and the `createProduct` controller function is called to handle the creation logic.
  - `DELETE /:ProductId`: This route is used to delete a product with the specified `ProductId`. The `validateProductId` middleware is applied to validate the `ProductId`, the `auth` middleware is applied to authenticate and authorize the user, and the `deleteProduct` controller function is called to handle the deletion logic.

#### Exporting the Router

- The router object is exported to be used in other modules.

### 2.3.3 User Router (users.js)

This code sets up a router in Express specifically for user-related routes. It defines routes for retrieving all users, retrieving the current user's information, updating the current user's profile, adding/removing products from the user's cart, and updating the cart total. The routes are protected with authentication middleware and apply validation middleware to ensure the correctness of the input data. The code follows a modular approach by separating the route handling logic into separate controllers and middleware functions, making it easier to maintain and extend the codebase.

#### Dependencies

- **express**: Express is a popular web framework for Node.js that simplifies the process of building web applications.

#### Importing Required Modules and Middlewares

- The code imports the `Router` object from the Express module to create a new router instance.
- The `auth` middleware from the "../middlewares/auth" module is imported to handle user authentication and authorization.
- The `getCurrentUser`, `updateProfile`, `getUsers`, `addToCart`, `removeFromCart`, and `updateCartTotal` functions from the "../controllers/users" module are imported to handle user-related operations.
- The `validateUserUpdate`, `validateUserId`, `validateProductId`, and `validateCartTotal` middlewares from the "../middlewares/validation" module are imported to validate user and cart-related input.

#### Defining Routes

- The router object is used to define the following routes:
  - `GET /getusers`: This route is used to retrieve all users. The `getUsers` controller function is called to handle the retrieval logic. The route is protected with the `auth` middleware to authenticate and authorize the user.
  - `GET /me`: This route is used to retrieve the current user's information. The `validateUserId` middleware is applied to validate the user ID, the `auth` middleware is applied to authenticate and authorize the user, and the `getCurrentUser` controller function is called to handle the retrieval logic.
  - `PATCH /me`: This route is used to update the current user's profile. The `validateUserUpdate` middleware is applied to validate the user update data, the `auth` middleware is applied to authenticate and authorize the user, and the `updateProfile` controller function is called to handle the update logic.
  - `PUT /:ProductId`: This route is used to add a product to the user's cart. The `validateProductId` middleware is applied to validate the product ID, the `auth` middleware is applied to authenticate and authorize the user, and the `addToCart` controller function is called to handle the addition logic.
  - `DELETE /:ProductId`: This route is used to remove a product from the user's cart. The `validateProductId` middleware is applied to validate the product ID, the `auth` middleware is applied to authenticate and authorize the user, and the `removeFromCart` controller function is called to handle the removal logic.
  - `PATCH /cart`: This route is used to update the total of the user's cart. The `validateCartTotal` middleware is applied to validate the cart total data, the `auth` middleware is applied to authenticate and authorize the user, and the `updateCartTotal` controller function is called to handle the update logic.

#### 404 Route Handling

- If none of the defined routes match the requested route, a custom `NotFoundError` middleware is triggered, returning a "Route not found" error.

#### Exporting the Router

- The router object is exported to be used in other modules.

## 2.4 Controllers

### 2.4.1 Product Controllers (products.js)

This code defines the controller functions for managing products. The `getProducts` function retrieves all products, `createProduct` function creates a new product, and `deleteProduct` function deletes a product. These functions interact with the `Product` model to perform database operations. They handle different scenarios such as validation errors, not found errors, and forbidden access errors, and pass the errors to the error handling middleware using the `next` function.

#### 2.4.1.1 getProducts

- This function is used to retrieve all products from the database.
- It uses the `Product` model to find all products by calling `Product.find({})`.
- If the retrieval is successful, it sends the products as the response with a status code of `USER_OK` (200).
- If an error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.1.2 createProduct

- This function is used to create a new product.
- It extracts the necessary fields (`name`, `price`, `description`, `category`) and optional fields (`subcat1`, `subcat2`, `image`) from the request body.
- If the optional fields (`subcat1`, `subcat2`, `image`) are not provided, default values are assigned.
- It creates a new product by calling `Product.create()` and passing an object with the extracted fields and the owner's ID (`req.user._id`).
- If the creation is successful, it sends the created product as the response with a status code of `USER_OK` (200).
- If a validation error occurs, it calls the `next` function with a `BadRequestError` to handle the bad request.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.1.3 deleteProduct

- This function is used to delete a product by its ID.
- It first finds the product by its ID using `Product.findById(req.params.ProductId)`.
- If the product is not found, it calls the `next` function with a `NotFoundError` to handle the not found error.
- If the product is found, it checks if the owner of the product matches the current user's ID (`req.user._id`).
- If the owner doesn't match, it calls the `next` function with a `ForbiddenError` to handle the forbidden access error.
- If the owner matches, it removes the product from the database using `Product.findByIdAndRemove(req.params.ProductId)`.
- If the deletion is successful, it sends the deleted product as the response with a status code of `USER_OK` (200).
- If the product is not found during the deletion process, it calls the `next` function with a `NotFoundError` to handle the not found error.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

### 2.4.2 User Controllers (users.js)

This code defines the controller functions for managing users. The `getUsers` function retrieves all users, `getCurrentUser` function retrieves the current user's information, `createUser` function creates a new user, `login` function handles user login, `updateProfile` function updates the user's profile information, `addToCart` function adds a product to the user's cart, `removeFromCart` function removes a product from the user's cart, and `updateCartTotal` function updates the user's cart total. These functions interact with the `User` model to perform database operations. They handle different scenarios such as validation errors, not found errors, unauthorized access errors, and conflicts, and pass the errors to the error handling middleware using the `next` function.

#### 2.4.2.1 getUsers

- This function is used to retrieve all users from the database.
- It uses the `User` model to find all users by calling `User.find({})`.
- If the retrieval is successful, it sends the users as the response with a status code of `USER_OK` (200).
- If an error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.2 getCurrentUser

- This function is used to retrieve the current user's information.
- It finds the user by their ID using `User.findById(req.user._id)`.
- If the user is not found, it returns a `NotFoundError` to handle the not found error.
- If the user is found, it sends the user's information as the response with a status code of `USER_OK` (200).
- If an error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.3 createUser

- This function is used to create a new user.
- It extracts the necessary fields (`name`, `phone`, `email`) and optional fields (`address`, `cartTotal`) from the request body.
- If the optional fields (`name`, `phone`, `address`, `cartTotal`) are not provided, default values are assigned.
- It hashes the password using bcrypt and creates a new user by calling `User.create()` with the extracted fields and the hashed password.
- If the creation is successful, it sends the created user (without the password) as the response.
- If a validation error occurs or if the username is already in use, it calls the `next` function with a `ConflictError` to handle the conflict.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.4 login

- This function is used to handle user login.
- It extracts the `email` and `password` from the request body.
- It calls the `findUserByCredentials` static method of the `User` model to find the user by their credentials.
- If the user is found and the password is correct, it generates a JSON Web Token (JWT) using the `jsonwebtoken` library and sends it as the response with a status code of `USER_OK` (200).
- If the email or password is invalid, it calls the `next` function with a `UnauthorizedError` to handle the unauthorized access error.

#### 2.4.2.5 updateProfile

- This function is used to update the current user's profile information.
- It extracts the `name`, `phone`, and `address` from the request body.
- It updates the user's information by calling `User.findByIdAndUpdate()` with the user's ID (`req.user._id`) and the new values, ensuring that validators are run and the updated user is returned.
- If the update is successful, it sends the updated user's information as the response with a status code of `USER_OK` (200).
- If the user is not found, it returns a `NotFoundError` to handle the not found error.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.6 addToCart

- This function is used to add a product to the user's cart.
- It extracts the product ID (`_id`) and the cart total from the request body.
- It updates the user's cart and cart total by calling `User.findByIdAndUpdate()` with the user's ID (`req.user._id`), `$addToSet` to add the product ID to the `cart` array, and the new cart total.
- If the

update is successful, it sends the updated user as the response with a status code of `USER_OK` (200).

- If the user is not found, it returns a `NotFoundError` to handle the not found error.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.7 removeFromCart

- This function is used to remove a product from the user's cart.
- It extracts the product ID (`_id`) and the cart total from the request body.
- It updates the user's cart and cart total by calling `User.findByIdAndUpdate()` with the user's ID (`req.user._id`), `$pull` to remove the product ID from the `cart` array, and the new cart total.
- If the update is successful, it sends the updated user as the response with a status code of `USER_OK` (200).
- If the user is not found, it returns a `NotFoundError` to handle the not found error.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

#### 2.4.2.8 updateCartTotal

- This function is used to update the user's cart total.
- It extracts the new cart total from the request body.
- It updates the user's cart total by calling `User.findByIdAndUpdate()` with the user's ID (`req.user._id`) and the new cart total.
- If the update is successful, it sends the updated user as the response with a status code of `USER_OK` (200).
- If the user is not found, it returns a `NotFoundError` to handle the not found error.
- If any other error occurs, it calls the `next` function with the error to pass it to the error handling middleware.

## 2.5 MiddleWares

### 2.5.1 Authorization (auth.js)

This code defines an authentication middleware called `auth`. The purpose of this middleware is to verify the authenticity of incoming requests by checking the presence and validity of a JSON Web Token (JWT) in the request headers.

Here's how the middleware works:

1. It first checks if the `authorization` header is present and starts with the string "Bearer ". If either of these conditions is not met, it means that the request is missing the required authorization, so it calls the `next` function with a `UnauthorizedError` to handle the unauthorized access error.

2. If the authorization header is present and starts with "Bearer ", it extracts the token from the header by removing the "Bearer " prefix.

3. It then attempts to verify the token using the `jwt.verify` method and the `JWT_SECRET` key. If the verification fails (e.g., due to an invalid or expired token), it calls the `next` function with a `UnauthorizedError` to handle the invalid token error.

4. If the token is successfully verified, the payload (containing the user's ID) is assigned to the `req.user` property. This allows subsequent middleware or route handlers to access the authenticated user's ID.

5. Finally, the middleware calls the `next` function to pass the request to the next middleware or route handler in the chain.

This `auth` middleware can be used in any route or middleware that requires authentication. By placing this middleware before the desired route or middleware, it ensures that only authenticated requests are allowed to proceed further.

To use this middleware, you can import it and apply it to your routes like this:

```javascript
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Protected route that requires authentication
router.get("/protected", auth, (req, res) => {
  // Access authenticated user's ID with req.user._id
  // Handle the request...
});

module.exports = router;
```

In this example, the `/protected` route is only accessible to authenticated users. The `auth` middleware is applied to this route by passing it as a second argument before the route handler. If the authentication fails, the middleware will automatically return a `UnauthorizedError` response. If the authentication succeeds, the route handler function will be executed.

### 2.5.2 Error Handling

#### 2.5.2.1 Error Handler (error-handler.js)

This code defines an error handler middleware function called `errorHandler`. This middleware is responsible for handling errors that occur during the processing of a request and sending an appropriate response back to the client.

Here's how the `errorHandler` middleware works:

1. The function takes four parameters: `err`, `req`, `res`, and `next`. These parameters represent the error object, the request object, the response object, and the next function in the middleware chain, respectively.

2. The `statusCode` variable is initialized with the value of `err.statusCode` if it exists, or `500` (Internal Server Error) if `err.statusCode` is not provided. This allows the error object to specify a custom status code, but defaults to `500` if not explicitly set.

3. The `message` variable is set to the error message from `err.message` if the `statusCode` is `500` (Internal Server Error), or a default message "An error has occurred on the server" if the `statusCode` is different. This ensures that internal server errors provide a generic error message, while other errors can provide more specific messages.

4. The `res.status(statusCode).send({ message })` line sends a JSON response with the appropriate status code and the error message in the response body.

5. Finally, the `next()` function is called to pass control to the next middleware in the chain.

6. The `errorHandler` function is exported so that it can be used as middleware in the application.

This error handler middleware can be added to the application's middleware stack to handle errors. When an error occurs, it can be passed to this middleware by calling `next(err)` in any previous middleware or route handler. The `errorHandler` middleware will then handle the error by sending an appropriate response to the client.

Example usage:

```javascript
const errorHandler = require("./errorHandler");

// ...
app.use(errorHandler);
```

By adding the `errorHandler` middleware to the application, it becomes the last middleware in the stack and will handle any unhandled errors by sending a response with the appropriate status code and error message.

#### 2.5.2.2 Custom Errors (badRequestError.js, conflictError.js, forbiddenError.js, notFoundError.js, unauthorizaedError.js)

**All custom errors follow the same format as the error described below:**

This code defines a custom error class called `BadRequestError` that extends the built-in `Error` class. The purpose of this error class is to represent a bad request error with an associated status code.

Here's how the `BadRequestError` class works:

1. The class extends the `Error` class, which provides basic error functionality.

2. The constructor of the `BadRequestError` class takes a `message` parameter, which represents the error message to be displayed. It calls the `super()` method to initialize the error message with the provided message.

3. The constructor also sets the `statusCode` property of the error object to `BAD_REQUEST_ERROR`. The `BAD_REQUEST_ERROR` is presumably a constant defined elsewhere and represents the HTTP status code for a bad request (e.g., 400).

4. Finally, the `BadRequestError` class is exported so that it can be used in other parts of the codebase.

This custom error class allows you to throw `BadRequestError` instances when you encounter a situation where a client's request is malformed or invalid. By setting the `statusCode` property, you can provide the appropriate HTTP status code when handling this error.

For example, in your code, you use this error class when validating the request body in the `createProduct` route handler. If the request body is invalid, you create a new `BadRequestError` instance and pass the error message to it. This error will then be caught by the error-handling middleware, which can return an appropriate response with the `BAD_REQUEST_ERROR` status code and the error message.

```javascript
// Example usage
const BadRequestError = require("../middlewares/badRequestError");

function createProduct(req, res, next) {
  // ...
  if (!subcat1) {
    throw new BadRequestError("Subcategory 1 is required");
  }
  // ...
}
```

In this example, if the `subcat1` field is missing in the request body, a `BadRequestError` is thrown with the error message "Subcategory 1 is required". This error will be caught by the error-handling middleware and a response with a `400 Bad Request` status code will be sent back to the client.

### 2.5.3 Logging (logger.js)

This code sets up logging middleware using the `winston` and `express-winston` packages. It defines two loggers: `requestLogger` and `errorLogger`.

Here's a breakdown of the code:

1. The `winston` package is imported to handle logging, and the `express-winston` package is imported to integrate logging with Express.

2. The `requestLogger` is created using `expressWinston.logger()`. It is configured to log HTTP requests, and the logs are stored in a file named "request.log". The logs are formatted as JSON.

3. The `errorLogger` is created using `expressWinston.errorLogger()`. It is configured to log errors, and the logs are stored in a file named "error.log". The logs are also formatted as JSON.

4. Both loggers are exported as properties of an object so that they can be used in the application.

These loggers can be added to the application's middleware stack to log requests and errors. By placing them before other middleware and route handlers, they will capture and log the relevant information.

Example usage:

```javascript
const { requestLogger, errorLogger } = require("./logger");

// ...

app.use(requestLogger);

// ...

app.use(errorLogger);
```

By adding the `requestLogger` middleware, all incoming requests and their relevant information will be logged to the "request.log" file.

By adding the `errorLogger` middleware, any errors that occur during request processing will be logged to the "error.log" file.

Make sure to configure the appropriate transport options and adjust the logging behavior to suit your specific needs.

### 2.5.4 Validation (validator.js)

These middleware functions can be used in your routes to validate incoming request data. If the data doesn't meet the defined constraints, `celebrate` will automatically handle the error and send an appropriate response.

This code uses the `celebrate` package for request validation and data schema definition using `Joi`.

Here's a breakdown of the code:

1. The `validatePhone` function is a custom validation function that checks if a value matches a regular expression pattern for a phone number.

2. The `validateHexadecimal` function is a custom validation function that checks if a value matches a regular expression pattern for a hexadecimal string.

3. The `validateProductBody` middleware uses `celebrate` and `Joi` to define validation rules for the request body when creating a product. It checks that the `name`, `price`, `description`, and `category` fields are present and meet the specified constraints.

4. The `validateUserInfo` middleware uses `celebrate` and `Joi` to define validation rules for user information when creating a user. It checks that the `name`, `phone`, `email`, and `password` fields meet the specified constraints. It also uses the custom `validatePhone` function to validate the phone number format.

5. The `validateUserLoginInfo` middleware uses `celebrate` and `Joi` to define validation rules for user login information. It checks that the `email` and `password` fields are present and meet the specified constraints.

6. The `validateProductId` middleware uses `celebrate` and `Joi` to define validation rules for a product ID parameter. It checks that the `ProductId` parameter is present and is a valid hexadecimal string.

7. The `validateUserId` middleware uses `celebrate` and `Joi` to define validation rules for a user ID parameter. It checks that the `user._id` parameter is present and is a valid hexadecimal string.

8. The `validateUserUpdate` middleware uses `celebrate` and `Joi` to define validation rules for updating user information. It checks that the `name` and `phone` fields are present and meet the specified constraints. It also uses the custom `validatePhone` function to validate the phone number format.

9. The `validateCartTotal` middleware uses `celebrate` and `Joi` to define validation rules for the cart total field when updating a user's cart. It checks that the `cartTotal` field is present.
