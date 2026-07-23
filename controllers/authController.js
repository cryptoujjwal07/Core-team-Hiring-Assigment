const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id)=>
  jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "7d"});

// User registration
const registerUser = async(req,res) =>{
  try{
    const{ name, email, password } = req.body;
    if(!name || !email || !password)
      return res.status(400).json({message:"All fields are required"});

    const userExists = await User.findOne({email});
    if(userExists)
      return res.status(400).json({message: "User already exists"});

    const user = await User.create({name, email, password});

    res.status(201).json({
      message: "Registration successful",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
  catch(err){
    res.status(500).json({ message:err.message });
  }
};


// User login / Signin
const loginUser = async(req, res)=>{
  try{
    const{email, password} = req.body;

    if(!email || !password) return res.status(400).json({message: "Email and password are required"});

    const user = await User.findOne({email});

    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({message:"Invalid email or password"});

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
};

// get user profile info
const getUserProfile = (req, res) =>{
  res.json({
    message : "Profile fetched successfully",
    user : req.user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};