import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const myobj = {
    name: {
       type: String,
       required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
};
const userSchema=mongoose.Schema(myobj,{timestamps:true});
// pre===before create(),before save();
userSchema.pre('save', async function(next) {
// not arrow function cause of async; this is create()
    if (!this.isModified('password')) {
        next();
    }
    // salt is of 1to20 characters
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});
//entered Password is a plain Text
userSchema.methods.matchPassword = 
  async function(enteredPassword) { return  await
    bcrypt.compare(enteredPassword, this.password);
  };
// create a collection of particular database 
// of MongoDB
const User = mongoose.model('User',userSchema);

export default User ;