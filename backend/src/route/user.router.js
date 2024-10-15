import { Router } from "express";
import { signup , login, updateUser,userProfile} from "../controller/user.controller.js";
const router = Router()



router.route('/signup').post(signup)

router.route('/login').post(login)
  
  // update route
router.route('/update').post(updateUser)



router.route('/profile').get(userProfile)

export default router