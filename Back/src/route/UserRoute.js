let express= require("express");
let controlUser = require("../controller/UserCtrl.js");

let router=express.Router();
const authenticateToken = require("../middleware/auth");

const authenticate = require("../middleware/auth");

// add user

router.post("/AddUser", controlUser.AddUser);


//login by admin
router.post("/loginadmin", controlUser.loginadmin);

//view users
router.get("/users",controlUser.getUsers);


router.delete("/users/:id", controlUser.deleteUser);

router.put("/users/:id", controlUser.updateUser);





router.get('/users', authenticateToken, (req, res) => {
  // req.user is available here
  res.json({ message: 'This is a protected route', user: req.user });
});

//user loginn by email and pass
  router.post("/userlogin",controlUser.loginuser);



//============ Orders Manage===========




router.post("/place-order", controlUser.placeOrder);

// Get user orders
router.get("/user-orders/:userId", controlUser.getUserOrders);


// GET all orders
router.get("/orders", controlUser.getAllOrders);




router.put("/delete/:id", controlUser.deleteOrder);

// Update order by ID
router.put("/update/:id", controlUser.updateOrder);







module.exports = router;





