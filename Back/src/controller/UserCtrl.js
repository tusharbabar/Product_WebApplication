let UserModel = require("../models/UserModel.js");
let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/auth");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { signToken } = require('../Utils/jwthelper.js');
const { sendOrderEmail} = require("../Utils/email");
const { sendInvoiceEmail } = require("../Utils/sendInvoiceMail.js"); 
const SECRET_KEY = process.env.JWT_SECRET;   
const EXPIRES_IN = process.env.JWT_EXPIRES; 

//add user
exports.AddUser = async (req, res) => {
  try {
    const { Name, Email, password, Date, role } = req.body;
    // check all fields
    if (!Name || !Email || !password || !Date || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.AddUser(Name, Email, hashedPassword, Date, role);
    res.status(200).json({ message: "User added successfully", user: result });
  } catch (err) {
    console.error("AddUser error:", err);
    res.status(500).json({ message: "Error adding user", error: err });
  }
};


//login Admin by email and password with jwt token

exports.loginadmin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    const users = await UserModel.loginadmin(Email);
    if (!users || users.length === 0) {
      return res.status(401).json({ message: "Invalid admin email or password" });
    }
    const admin = users[0];
    // role check
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Not an admin user" });
    }
    // bcrypt compare
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid admin email or password" });
    }
    // JWT token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );
    res.status(200).json({
      message: "Admin login successful",
      token,
      user: { id: admin.id, Name: admin.Name, Email: admin.Email, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};









//login by user email and pass

exports.loginuser = async (req, res) => {
  const { Email, password } = req.body;
  try {
    const users = await UserModel.loginuser(Email);
    

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    const user = users[0];
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );
    res.status(200).json({
      message: "Login success",
      user: { id: user.id, Name: user.Name, Email: user.Email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};











//View users table in admin dash
exports.getUsers = (req, res) => {
  UserModel.getAllUsers()
    .then(users => res.json(users))
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    });
};



//delete user
exports.deleteUser = (req, res) => {
  let user_id = req.params.id; // Get from URL params

  if (!user_id) {
    return res.status(400).send("user_id is required");
  }

  UserModel.DeleteUser(user_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
// update user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, password } = req.body;

    if (!Name || !Email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const result = await UserModel.updateUser(id, { Name, Email, password });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully " });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};




// ============ Manage Orders =======================


// exports.placeOrder = (req, res) => {
//   const { user_id, product_id, address, payment_method } = req.body;
//   if (!user_id || !product_id || !address || !payment_method) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   UserModel.createOrder(req.body, async (err, result) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     try {
//       await sendOrderEmail(result.Email, result.Name, result.product_name);
//       res.status(201).json({
//         message: "Order placed successfully & email sent",
//         orderId: result.insertId,
//       });
//     } catch (emailErr) {
//       console.error("Email Error:", emailErr);
//       res.status(201).json({
//         message: "Order placed successfully but email failed",
//         orderId: result.insertId,
//       });
//     }
//   });
// };

// Add New part of Invoice Bill

// exports.placeOrder = (req, res) => {
//   const { user_id, product_id, address,contact, payment_method } = req.body;
//   if (!user_id || !product_id || !address || !contact || !payment_method) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   UserModel.createOrder(req.body, async (err, result) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     try {
//       // Email send with product details, price, and address
//       await sendOrderEmail(
//         result.Email,
//         result.Name,
//         result.product_name,
//         result.price,      
//         result.address     
//       );

//       res.status(201).json({
//         message: "Order placed successfully & email sent",
//         orderId: result.insertId,
//       });
//     } catch (emailErr) {
//       console.error("Email Error:", emailErr);
//       res.status(201).json({
//         message: "Order placed successfully but email failed",
//         orderId: result.insertId,
//       });
//     }
//   });
// };


exports.placeOrder = (req, res) => {
  const { user_id, product_id, address, contact, payment_method } = req.body;

  if (!user_id || !product_id || !address || !contact || !payment_method) {
    return res.status(400).json({ error: "All fields are required" });
  }

  UserModel.createOrder(req.body, async (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    try {
      // ✅ 1. Send Order Confirmation Email
      await sendOrderEmail(
        result.Email,
        result.Name,
        result.product_name,
        result.price,
        result.address
      );

      // ✅ 2. Send Invoice PDF
      await sendInvoiceEmail({
        ...result,
        payment_method
      });

      res.status(201).json({
        message: "Order placed, confirmation mail & invoice sent ✅",
        orderId: result.insertId,
      });
    } catch (emailErr) {
      console.error("Email Error:", emailErr);

      res.status(201).json({
        message: "Order placed but email failed to send ❌",
        orderId: result.insertId,
      });
    }
  });
};


// Get user orders
exports.getUserOrders = (req, res) => {
  const { userId } = req.params;
  UserModel.getOrdersByUser(userId, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });
};



// view all user
// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await UserModel.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};


// Admin services========================


//=======delete and update orders====================

exports.deleteOrder = (req, res) => {
const id = req.params.id;
UserModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  });
};

// Update order
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  UserModel.updateById(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order updated successfully" });
  });
};
