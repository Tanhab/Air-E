const express = require('express');
const validate = require('../../middlewares/validate');

const router = express.Router();

router
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);
