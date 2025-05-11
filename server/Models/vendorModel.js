const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const vendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required field."],
    minLength: [3, "Full name must be at least 3 characters long."],
    validate: {
      validator: function (val) {
        return /^[a-zA-Z\s]+$/.test(val);
      },
      message: "Name must contain only letters and spaces.",
    },
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required field."],
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phoneNo: {
    type: String,
    validate: [
      {
        validator: (phoneNo) => {
          return validator.isNumeric(phoneNo);
        },
        message: "Phone Number must contains only numbers.",
      },
      {
        validator: (phoneNo) => {
          validator.isMobilePhone(phoneNo, "en-PK") &&
            /^03\d{9}$/.test(phoneNo);
        },
        message: "Invalid phone number. Phone number must contain 11 digits.",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required field."],
    validate: {
      validator: (password) => {
        return validator.isStrongPassword(password, {
          minLength: 8,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message: "Password is not strong enough.",
    },
  },
  cnic: {
    type: String,
    unique: true,
    required: [true, "CNIC is rquired field."],
    validate: {
      validator: (cnic) => {
        return /^\d{13}$/.test(cnic);
      },
      message: "CNIC must be exactly 13 digits and contain only numbers",
    },
  },
  bankAccountNo: {
    type: String,
    unique: true,
    required: [true, "Bank account number is rquired field."],
    validate: {
      validator: (accountNo) => {
        return /^[0-9]{6,20}$/.test(accountNo);
      },
      message:
        "Account number must be between 6 to 20 digits and contain only numbers",
    },
  },
  IBANno: {
    type: String,
    // unique: true,
    required: [true, "IBAN is rquired field."],
    // validate: {
    //   validator: (IBAN) => {
    //     return validator.isIBAN(IBAN) && IBAN.startsWith("PK");
    //   },
    //   message:
    //     "Invalid IBAN. Must be a valid Pakistani IBAN starting with 'PK'.",
    // },
  },
  nurseryName: {
    type: String,
    unique: true,
    required: [true, "Nursery name is required field."],
    minLength: [3, "Nursery name must be at least 3 characters long"],
  },
  address: {
    type: String,
    required: [true, "Address is required field."],
  },
  otp: {
    type: String,
    validate: {
      validator: (otp) => {
        return otp.length == 6;
      },
      message: "Invalid OTP. OTP must consists of 6 digits.",
    },
  },
  otpExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12); //12 is the cost factor
  next();
});
vendorSchema.methods.comparePasswordInDB = async function (
  password,
  passwordDB
) {
  return await bcrypt.compare(password, passwordDB);
};

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
