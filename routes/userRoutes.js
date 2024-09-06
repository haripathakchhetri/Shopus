import express from "express"
import { getAllUsers, loginUser, registerUser, updateUser } from "../controllers/userController.js";
import { notAllowed } from "../utils/shareFunc.js";
import Joi from "joi"
import expressJoiVal from "express-joi-validation";
import { checkUser } from "../middlewares/userCheck.js";



const validator = expressJoiVal.createValidator({});

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Please Enter Email',
    'string.email': 'Please provide a valid email address',
  }),
  password: Joi.string().required()
  // password: Joi.string().pattern(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/).required().messages({
  //   'string.pattern.base': `provide strong password that have number special character`,
  // })
})

const registerSchema = Joi.object({

  email: Joi.string().email().required().messages({
    'string.empty': 'Please Enter Email',
    'string.email': 'Please provide a valid email address',
  }),
  password: Joi.string().required(),
  fullname: Joi.string().required(),

  // password: Joi.string().pattern(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/).required().messages({
  //   'string.pattern.base': `provide strong password that have number special character`,
  // })
})


router.route('/').getAllUsers

router.route('/login').post(validator.body(loginSchema), loginUser).all(notAllowed);

router.route("/register").post(validator.body(registerSchema), registerUser).all(notAllowed);

router.route('/:id').patch(checkUser, updateUser).all(notAllowed)

export default router;