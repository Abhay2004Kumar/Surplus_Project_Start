import {Router} from "express"
import { createDonation, getAllDonations, logOutUser, loginUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const Userrouter = Router()

Userrouter.route("/registerUser").post(registerUser)
Userrouter.route("/loginUser").post(loginUser)
Userrouter.route("/logoutUser").post(verifyJWT,logOutUser)
Userrouter.route("/donate").post(verifyJWT, upload.single("foodImage"),createDonation)
Userrouter.route("/get-all-donations").get(verifyJWT,getAllDonations)


export default Userrouter