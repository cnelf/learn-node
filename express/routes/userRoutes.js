const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.route('/').get(userController.getAllUsers).post(userController.createUserById);
userRouter
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;
