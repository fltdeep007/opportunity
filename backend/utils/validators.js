const z = require('zod');


const registerSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  email: z.string()
    .email({ message: 'Please provide a valid email address' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(16, { message: 'Password cannot exceed 100 characters' }),
 role:z.enum(["Customer" , "Seller" , "Admin"] , {
    message:"Role must be either customer , seller or admin"
 }).default("customer").optional()
});

// User login validation schema
const loginSchema = z.object({
  email: z.string()
    .email({ message: 'Please provide a valid email address' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
});

// User update validation schema
const updateUserSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name cannot exceed 50 characters' })
    .optional(),
  email: z.string()
    .email({ message: 'Please provide a valid email address' })
    .optional(),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
    .optional(),
    role:z.enum(["Customer" , "Seller" , "Admin"] , {
        message:"Role must be either customer , seller or admin"
     }).optional()
  
});


const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  updateUserSchema
};