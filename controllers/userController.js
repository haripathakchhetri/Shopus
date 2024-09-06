import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


export const getAllUsers = (req, res) => {
  return res.status(200).json({})
}

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {

    if (mongoose.isValidObjectId(id)) {
      const isExist = await User.findById(id);
      if (!isExist) return res.status(404).json({
        message: 'User doesn\'t exist'
      });

      await isExist.updateOne({
        fullname: req.body.fullname || isExist.fullname,
        email: req.body.email || isExist.email
      });
      return res.status(200).json({
        message: 'User updated successfully'
      })
    } else {
      return res.status(400).json({ message: 'please provide valid id' })

    }

  } catch (err) {
    return res.status(400).json({ error: `${err}` })
  }
}

export const loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(404).json({ message: "User doesn\'t exist" })

    //If user exists database ko password ra login password or raw password test garni
    const pass = bcrypt.compareSync(password, isExist.password);

    //if password doesn't matches
    if (!pass) return res.status(401).json({ message: "Invalid Crediential" });

    const token = jwt.sign({
      id: isExist._id,
      isAdmin: isExist.isAdmin
    }, 'secret');  //yo secret j diyeni hunxa tara ali strong dinu paryo

    return res.status(200).json({
      token,
      id: isExist.id,
      email: isExist.email,
      fullname: isExist.fullname,
      isAdmin: isExist.isAdmin,
      id: isExist._id

    })



  } catch (err) {
    console.log({ error: `${err}` })
    return res.status(400).json({ error: `${err}` })

  }
}


export const registerUser = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    const isExit = await User.findOne({ email });
    if (isExit) {
      return res.status(409).json({ message: "Email already in use" })
    }

    const hashPass = bcrypt.hashSync(password, 10);


    await User.create({
      email,
      password: hashPass,
      fullname
    });

    return res.status(201).json({ msg: "successfully Registered" })

  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: `${err}` })
  }
}