import { Router } from "express";
import { signup , login, updateUser,userProfile} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
  // update route
router.route('/update').post(isLoggedIn,updateUser)
// user prodile route
router.route('/profile').get(isLoggedIn,userProfile)
// chat route
router.route('/chat').post(isLoggedIn,chatInstance)
router.route('/delete').delete(isLooggedIn,deleteUser)

export default router
