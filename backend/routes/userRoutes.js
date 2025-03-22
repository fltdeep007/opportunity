const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

const { validate, registerSchema, updateUserSchema, loginSchema } = require('../utils/validators');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/login', validate(loginSchema), loginUser);


router.post('/register', validate(registerSchema), createUser);


router.get('/', protect, authorizeRoles("Admin"), getUsers);


router.route('/:id')
  .get(protect, getUserById)
  .put(protect, validate(updateUserSchema), updateUser)
  .delete(protect, deleteUser);

module.exports = router;
