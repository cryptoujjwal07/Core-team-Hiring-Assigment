const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password:{
    type: String,
    required: true,
  },
});
//hash password before saving
userSchema.pre("save", async function(){
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
//compare b/w this and entered password during login
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);