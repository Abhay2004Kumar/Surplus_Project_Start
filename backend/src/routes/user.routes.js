import {Router} from "express"


import { 
    createDonation, 
    getAllDonations, 
    getDonationsByPostalCode, 
    getUserDonations, 
    logOutUser, 
    loginUser, 
    registerUser,  
    requestPartialDonation 
  } from "../controllers/user.controller.js"; // Import the new controller methods
  import { verifyJWT } from "../middlewares/auth.middleware.js";
  import { upload } from "../middlewares/multer.middleware.js";
import { approveRequest, createRequest, deleteRequest, getUserRequests, updateRequestStatus } from "../controllers/request.controller.js";
import { createNotification, deleteNotification, getNotifications, updateNotificationStatus } from "../controllers/notification.controller.js";
  
  const Userrouter = Router();
  
  // User routes
  Userrouter.route("/registerUser").post(registerUser);
  Userrouter.route("/loginUser").post(loginUser);
  Userrouter.route("/logoutUser").post(verifyJWT, logOutUser);
  
  
  // Donation routes
  Userrouter.route("/donate").post(verifyJWT, upload.single("foodImage"), createDonation);
  Userrouter.route("/get-all-donations").get(verifyJWT, getAllDonations);
  Userrouter.route("/get-donation-by-postal").post(verifyJWT, getDonationsByPostalCode);
  Userrouter.route('/get-user-donations').get(verifyJWT,getUserDonations) 
  // Userrouter.route("/request-full/:id").delete(verifyJWT, requestFullDonation);
  Userrouter.route("/request-partial/:id").post(verifyJWT, requestPartialDonation);
 

  //request routes
  Userrouter.route("/requests").post(verifyJWT,createRequest)
  Userrouter.route("/requests").get(verifyJWT,getUserRequests)
  Userrouter.route("/requests/:id").put(verifyJWT,updateRequestStatus)
  Userrouter.route("/requests/:requestId").delete(verifyJWT,deleteRequest)
  Userrouter.route("/requests/:requestId/approve").put(verifyJWT,approveRequest)


  // notification routes
  Userrouter.route("/notification").post(verifyJWT,createNotification)
  Userrouter.route("/notifications").get(verifyJWT,getNotifications)
  Userrouter.route("/notifications/:notificationId").put(verifyJWT,updateNotificationStatus)
  Userrouter.route("/notifications/:id").delete(verifyJWT,deleteNotification)
  



  
  export default Userrouter;