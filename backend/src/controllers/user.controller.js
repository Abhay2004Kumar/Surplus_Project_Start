import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Donation } from "../models/donation.models.js";
import bcrypt from 'bcrypt'

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //save refresh token in MongoDB for future login
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresha and access token")
    }
}
const isValidContact = (contact) => {
    // Ensure contact is a string of digits with the desired length (e.g., 10 digits)
    const contactRegex = /^\d{10}$/; // Adjust length as per requirements
    return contactRegex.test(contact);
};

const registerUser = asyncHandler( async (req,res) => {
    //get user details from frontend
     const {firstName,lastName,contact, email, password}= req.body
    //validation
    if(
     [firstName,lastName, contact,email, password].some((field) => field?.trim() === "")
    ){
     throw new ApiError(400, "All fields are required")
    }
 
    if (!isValidContact(contact)) {
        throw new ApiError(400, "Invalid contact number. It must be 10 digits long.");
    }
 
    //check if user already exists: email
    const existedUser = await User.findOne({email})
 
    if(existedUser){
     throw new ApiError(409,"User already exists.")
    }
 
 
    
 
 
     // create user object -  create entry in DB
     const user = await User.create({
        firstName,
        lastName,
        contact,
         email,
         password
     })
 
     // remove password and refresh token field from response
     const createdUser = await User.findById(user._id).select(
         "-password -refreshToken"
     )
 
     //check for user creation
 
     if(!createdUser){
         throw new ApiError(500, "Something went wrong during registering the user")
     }
 
     
     //return response
 return res.status(201).json(
     new ApiResponse(200, createdUser, "User registered successfully")
 )
 
 
 })

 export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming `verifyJWT` middleware sets `req.user`
  
  const user = await User.findById(userId).select("-password");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, contact, password } = req.body;

  if ([firstName, lastName, contact].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "First name, last name, and contact are required");
  }

  if (!isValidContact(contact)) {
    throw new ApiError(400, "Invalid contact number. It must be 10 digits long.");
  }

  // Find and update the user
  const updateFields = { firstName, lastName, contact };
  if (password) {
    
    updateFields.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
    select: "-password",
  });

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "User profile updated successfully")
  );
});





 const loginUser = asyncHandler(async (req,res) => {
    // req body -> data
    //username or email
    const {email,password} = req.body 
    if(!(email)){
        throw new ApiError(400, "email is required")
    }

    //find the user
    const user = await User.findOne({
       email
    })

    if(!user){
        throw new ApiError(404, "User does not exist!")
    }
    // validate password
    const isPasswordvalid = await user.isPasswordCorrect(password)
    if(!isPasswordvalid) {
        throw new ApiError(401, "Password is incorrect!")
    }

    //access and refresh token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-refreshToken -password")

    //send cookie
    const options = {
        httpOnly: true,
        secure: true
        
    } //cookies are only modifiable through server

    return res.status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,
            {
                user: loggedInUser, accessToken,
                refreshToken
            },
            "User logged in successfully"
            )
    )


})

const logOutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes field from documennt
            }
        },
        {
            new: true
        }
    )
    //for cookies
    const options = {
    httpOnly: true,
    secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

export const createDonation = asyncHandler(async (req, res) => {
    const { food, quantity, expiryDate,postal,location, contact } = req.body;
  
    // Validation
    if ([food, quantity, expiryDate, ,postal,location, contact].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required.");
    }
  
    // Upload food image to Cloudinary
    const uploadedImage = await uploadCloudinary(req.file.path);
   
    if (!uploadedImage) {
      throw new ApiError(500, "Error uploading image.");
    }
  
    const newDonation = new Donation({
      food,
      quantity,
      foodImage: uploadedImage.url,
      expiryDate,
      location,
      contact,
      postal,
      user: req.user._id, // Associate donation with authenticated user
    });
  
    await newDonation.save();
    res.status(201).json(new ApiResponse(200, newDonation, "Donation created successfully"));
  });
  
  export const getAllDonations = asyncHandler(async (req, res) => {
    try {
      // Fetch all donations from the database
      const donations = await Donation.find()
        .populate("user", "firstName lastName email") // Populate user details if needed
        .sort({ createdAt: -1 }); // Sort donations by creation date (optional)
  
      if (!donations || donations.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], "No donations found"));
      }
  
      // Return the donations
      res.status(200).json(new ApiResponse(200, donations, "Donations retrieved successfully"));
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json(new ApiResponse(500, null, "Error retrieving donations"));
    }
  });

    export const getDonationsByPostalCode = asyncHandler(async (req, res) => {
        try {
        const { postal } = req.body; // Get postal code from the request body
    
        if (!postal) {
            return res.status(400).json(new ApiResponse(400, null, "Postal code is required"));
        }
    
        // Fetch donations with the specified postal code
        const donations = await Donation.find({ postal })
            .populate("user", "firstName lastName email") // Populate user details if needed
            .sort({ createdAt: -1 }); // Sort donations by creation date (optional)
    
        if (!donations || donations.length === 0) {
            return res.status(404).json(new ApiResponse(404, [], "No donations found for this postal code"));
        }
    
        // Return the donations
        res.status(200).json(new ApiResponse(200, donations, "Donations retrieved successfully"));
        } catch (error) {
        console.error("Error fetching donations by postal code:", error);
        res.status(500).json(new ApiResponse(500, null, "Error retrieving donations by postal code"));
        }
    });

    // export const requestFullDonation = asyncHandler(async (req, res) => {
    //   const { id } = req.params;
    
    //   // Find the donation by ID
    //   const donation = await Donation.findById(id);
    
    //   if (!donation) {
    //     return res.status(404).json({ error: "Donation not found" });
    //   }
    
    //   // Check if the donation has already been consumed
    //   if (donation.quantity <= 0) {
    //     return res.status(400).json({ error: "Donation quantity is already 0, cannot request full donation" });
    //   }
    
    //   // Consume the entire quantity
    //   const consumedQuantity = donation.quantity;
    //   donation.quantity = 0; // Set quantity to 0
    //   await donation.save();
    
    //   // Delete the donation if quantity becomes zero
    //   await Donation.findByIdAndDelete(id);
    
    //   return res.status(200).json({
    //     success: true,
    //     message: "Donation fully consumed and deleted",
    //     data: { consumedQuantity },
    //   });
    // });
    
    
    // Handle partial donation requests
    export const requestPartialDonation = asyncHandler(async (req, res) => {
      const { id } = req.params;
      const { quantity } = req.body;
    
      const donation = await Donation.findById(id);
    
      if (!donation || quantity <= 0 || donation.quantity < quantity) {
        return res.status(400).json({ error: "Invalid request or insufficient quantity" });
      }
    
      // Reduce the donation quantity
      donation.quantity -= quantity;
      if (donation.quantity === 0) {
        await Donation.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Donation fully consumed and deleted", data: donation });
      }
     
      await donation.save();
    
      res.status(200).json({ success: true, message: "Donation quantity updated", data: donation });
    });

    
    export const getUserDonations = asyncHandler(async (req,res) => {
      const userId = req.user._id
      const donations = await Donation.find({ user: userId }).sort({ createdAt: -1 });
      res.status(200).json({ data: donations });
    })
    
      
  
  



 export {registerUser, loginUser, logOutUser}