const z = require("zod");
const vendorSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: "Please provide full name" })
    .min(3, "Full name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Full name must contains only letters and spaces."),
  email: z
    .string()
    .nonempty({ message: "Please provide email" })
    .email("Invalid email format"),
  phoneNo: z
    .string()
    .nonempty({ message: "Please provide phone number" })
    .length(11, "Phone number must be exactly 11 digits long.")
    .regex(
      /^03\d{9}$/,
      "Phone number must starts with 03 and contain Only numbers."
    ),
  password: z
    .string()
    .nonempty({ message: "Please provide password" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")
    .regex(/\d/, "Password must contain at least one number"),
  cnic: z
    .string()
    .nonempty({ message: "Please provide CNIC" })
    .length(13, "CNIC must be 13 digits long")
    .regex(/^\d+$/, "CNIC must contain Only numbers"),
  bankAccountNo: z
    .string()
    .nonempty({ message: "Please provide bank account number." })
    .regex(/^\d+$/, "Account number must contain Only numbers")
    .min(6, "Account number must be atleat 6 digits long")
    .max(20, "Account number must not contain more than 20 digits"),
  IBANno: z.string().nonempty({ message: "Please provide IBAN" }),
  // .regex(/^PK\d{2}[A-Z]{4}\d{16}$/, "Invalid IBAN"),
  nurseryName: z
    .string()
    .nonempty({ message: "Please provide nursery name" })
    .min(3, "Nursery name must be at least 3 characters long"),
  address: z.string().nonempty({ message: "Please provide address" }),
});

module.exports = vendorSchema;
