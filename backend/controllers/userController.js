import expressAsyncHandler from "express-async-handler";
import asyncHander from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
// @desc  Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = expressAsyncHandler(async (req,res)=> {
    const {email, password} = req.body;
    console.log('userControllerjs;authUser();',
      {email,password});
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req,res)=> {
    const {name, email, password} = req.body;
    // console.log('userControllerjs;registerUser();',
    //    {name,email,password});
    const userExists = await User.findOne({email});
    if (userExists) {
      res.status(400);// client error
      throw new Error('registerUser();User already exists');
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if(user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('invalid user data');;
    }
  }
);

// @desc logout a user
// route POST /api/users/logout
// @access Public
const logoutUser = expressAsyncHandler(async (req, res) => {
    // name of cookie is 'jwt'
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({message:"userControllerjs;User logged out"});
  }
);

// @desc gET user Profile 
// route GET /api/users/profile
// @access Private
const getUserProfile = expressAsyncHandler(
// we axcess to user throw 'req.user'
  async (req, res) => {
    console.log('userControllerjs;req.user:',req.user); 
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    };
    res.status(200).json(user);
  }
);

// @desc update  user Profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = expressAsyncHandler(
    async (req, res) => {
    console.log('userControllerjs;update;req.user:',req.user);
    const user = await User.findById(req.user._id);
    if(user) {
    //either included in the body or stays where it is
      user.name =  req.body.name  || user.name;
      user.email = req.body.email || user.email;
      if(req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser =  await user.save();
      res.status(200).json({
        _id:   updatedUser._id,
        name:  updatedUser.name,
        email: updatedUser.email
      });
    } else {
      res.status(404);
      throw new Error('user not found');
    }
  }
);

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};