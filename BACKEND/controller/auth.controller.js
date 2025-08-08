const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs");
const generatejwt = require("../utils/generatetoken.js"); // Same util you used
const cloudinary = require("../utils/cloudinary.js"); // For optional profile image upload


const signup = async (req, res) => {
  try {
    const { 
      role, 
      email, 
      password, 
      name,
      subjects,
      availability,
      bio,
      profileImage
    } = req.body;

    // Basic validation
    if (!role || !email || !password || !name) {
      return res.status(400).json({ 
        message: "Role, name, email, and password are mandatory" 
      });
    }

    // Validate role
    if (!['student', 'mentor'].includes(role)) {
      return res.status(400).json({ 
        message: "Role must be either 'student' or 'mentor'" 
      });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters" 
      });
    }

    // Role-specific validation
    if (role === 'student') {
      if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return res.status(400).json({ 
          message: "Preferred subjects are required for students" 
        });
      }
    }

    if (role === 'mentor') {
      if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return res.status(400).json({ 
          message: "Subject expertise is required for mentors" 
        });
      }
      if (!availability || !Array.isArray(availability)) {
        return res.status(400).json({ 
          message: "Availability slots are required for mentors" 
        });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists with this email" 
      });
    }

    // Prepare user data
    const userData = {
      role,
      email,
      password, // Will be hashed by mongoose pre-save
      name,
      subjects,
      bio: bio || ""
    };

    // Add role-specific fields
    if (role === 'mentor') {
      userData.availability = availability || [];
    }

    // Handle optional profile image upload
    if (profileImage) {
      const uploadedImg = await cloudinary.uploader.upload(profileImage, { folder: "profiles" });
      userData.profileImage = uploadedImg.secure_url;
    }

    // Save user
    const newUser = new User(userData);
    await newUser.save();

    // Generate JWT token
    await generatejwt(newUser._id, res);

    // Prepare response
    let responseData = {
      id: newUser._id,
      role: newUser.role,
      email: newUser.email,
      name: newUser.name,
      subjects: newUser.subjects,
      bio: newUser.bio,
      profileImage: newUser.profileImage
    };

    if (role === 'mentor') {
      responseData.availability = newUser.availability;
      responseData.rating = newUser.rating;
    }

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      user: responseData
    });

  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT
    await generatejwt(user._id, res);
    
    // Prepare response
    let responseData = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      subjects: user.subjects,
      profileImage: user.profileImage,
      createdAt: user.createdAt
    };

    if (user.role === 'mentor') {
      responseData.availability = user.availability;
      responseData.rating = user.rating;
    }
    
    return res.status(200).json({
      message: "Login successful",
      user: responseData
    });
    
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const logout = async (req, res) => {
  try {   
    const options = {
      httpOnly: true,
      secure: true
    };
    res.cookie("jwt", "", options);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const profile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let responseData = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      subjects: user.subjects,
      bio: user.bio,
      profileImage: user.profileImage,
      createdAt: user.createdAt
    };

    if (user.role === 'mentor') {
      responseData.availability = user.availability;
      responseData.rating = user.rating;
    }

    return res.status(200).json({ user: responseData });
  } catch (error) {
    console.error("Error in profile controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const checkauth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkauth controller", error.message);
    res.status(500).json("Internal server error");
  }
};

module.exports = { signup, login, logout, profile, checkauth };
