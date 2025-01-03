import { Router } from "express";
import { signup , login, updateUser,userProfile} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router()



router.route('/signup').post(signup)
router.route('/login').post(login)
  
  // update route
router.route('/update').post(isLoggedIn,updateUser)
router.route('/profile').get(isLoggedIn,userProfile)

export default router
