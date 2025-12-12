import express from 'express'
const router = express.Router();
import {getAllUser, userRegister, userToCheck, userVerified} from '../controllers/user.controller.js'

router.post('/registerName', userRegister);
router.get('/verifiedUser', userVerified);
router.get("/toCheckUser", userToCheck);
router.get('/getAllUser', getAllUser);

const userRoutes = router;
export default userRoutes;