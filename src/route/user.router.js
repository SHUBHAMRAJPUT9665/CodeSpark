import { Router } from "express";
import { signup , updateUser,userProfile} from "../controller/user.controller.js";
const router = Router()



router.route('/signup').post(signup)
  
  // update route
router.route('/update').post(updateUser)


router.route('/profile').get(userProfile)

export default router