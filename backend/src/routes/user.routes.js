import {Router} from "express"
import { logOutUser, loginUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const Userrouter = Router()

Userrouter.route("/registerUser").post(registerUser)
Userrouter.route("/loginUser").post(loginUser)
Userrouter.route("/logoutUser").post(verifyJWT,logOutUser)


export default Userrouter