const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `User with this ${conflictField} already exists!`,
        conflict: conflictField,
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5. Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Set secure cookie (for SSR login option)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 86400000, // 1 day
    });

    // 7. Send success response
    return res.status(201).json({
      success: true,
      message: `@${newUser.username} registered successfully!`,
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send('All fields are compulsory')
        }
        const existingUser = await User.findOne({ email })

        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
            const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 86400000, // 7 days or 1 day
            });
            await existingUser.save()
            res.status(200).json({
                success: true,
                message: `${existingUser.username} login successful`,
                token,
                user: {
                  id: existingUser._id,
                  username: existingUser.username,
                  email: existingUser.email,
                },
              });
              
        }
        else {
            res.status(401).json({
                success: true,
                message: `user doesn't exists!`,
            })
        }

    }
    catch (error) {
        console.error("Login Error:", error);

    }
}
