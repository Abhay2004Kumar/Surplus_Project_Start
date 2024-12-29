import {Router} from "express"


import { 
    createDonation, 
    getAllDonations, 
    getDonationsByPostalCode, 
    logOutUser, 
    loginUser, 
    registerUser, 
    requestFullDonation, 
    requestPartialDonation 
  } from "../controllers/user.controller.js"; // Import the new controller methods
  import { verifyJWT } from "../middlewares/auth.middleware.js";
  import { upload } from "../middlewares/multer.middleware.js";
  
  const Userrouter = Router();
  
  // User routes
  Userrouter.route("/registerUser").post(registerUser);
  Userrouter.route("/loginUser").post(loginUser);
  Userrouter.route("/logoutUser").post(verifyJWT, logOutUser);
  
  // Donation routes
  Userrouter.route("/donate").post(verifyJWT, upload.single("foodImage"), createDonation);
  Userrouter.route("/get-all-donations").get(verifyJWT, getAllDonations);
  Userrouter.route("/get-donation-by-postal").post(verifyJWT, getDonationsByPostalCode);
  
 Userrouter.route("/request-full/:id").post(verifyJWT, requestFullDonation);
 Userrouter.route("/request-partial/:id").post(verifyJWT, requestPartialDonation);

  
  export default Userrouter;