const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcrypt');

const customerSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
        trim: true,
        validate: {
            validator: function(val){
                return /^[a-zA-Z\s]+$/.test(val)
            },
            message: "Name must contain only letters and spaces."
        }
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter your email."],
        validate: [validator.isEmail, "Please enter valid email."],
        lowercase: true
    },
    password:{
        type: String,
        required:[true, "Please enter password."],
        minlength: [8, "Password must be minimum of 8 characters."]
    },
    confirmPassword: {
        type: String,
        required:[true, "Please confirm your password."],
        validate: {
            validator: function(val){
                return val===this.password;
            },
            message: "Password and confirm password must match."
        }
    }
});

customerSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password, 12) //12 is the cost factor
    this.confirmPassword= undefined;
    next();
});

customerSchema.methods.comparePasswordInDB= async function(password,passwordDB){
    return await bcrypt.compare(password, passwordDB)
}
const Customer= mongoose.model('Customer', customerSchema);
module.exports= Customer;
