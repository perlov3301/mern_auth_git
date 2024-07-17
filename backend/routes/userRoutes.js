import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
// /api/users will be conected to the whole file
// preface(antichamber) for routes is within serverjs
router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
// function protection goes sync as first arg
router.get('/profile',protect, getUserProfile);
router.put('/profile',protect, updateUserProfile);
// router.route('/profile')
//   .get(getUserProfile)
//   .put(updateUserProfile);

export default router;