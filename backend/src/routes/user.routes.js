import {Router} from "express"
import { createDonation, logOutUser, loginUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const Userrouter = Router()

Userrouter.route("/registerUser").post(registerUser)
Userrouter.route("/loginUser").post(loginUser)
Userrouter.route("/logoutUser").post(verifyJWT,logOutUser)
Userrouter.route("/donate").post(verifyJWT, upload.single("foodImage"),createDonation)


export default Userrouter