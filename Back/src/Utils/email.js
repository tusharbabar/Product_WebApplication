// // utils/email.js
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "babartushar560@gmail.com",
//     pass: "yror zqrv qpio mtdx", 
//   },
// });

// // Send email function
// exports.sendOrderEmail = (to, userName, productName) => {
//   const mailOptions = {
//     from: "babartushar560@gmail.com",
//     to,
//     subject: "🛒 Order Confirmation",
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//         <h2 style="color: #2e6c80;">✅ Order Confirmed</h2>
//         <p>Hi <b>${userName}</b>,</p>
//         <p>Your order for <b>${productName}</b> has been placed successfully.</p>
//         <p>We will deliver it soon 🚚</p>
//         <br/>
//         <p>If you have any questions, feel free to contact our support team at 
//           <a href="mailto:support@dropshop.com">support@dropshop.com</a>.
//         </p>
//         <br/>
//         <p>Thank you for shopping with us!</p>

//         <br/>
//         <p>Best Regards,</p>
//         <p><b>DropShop Team</b></p>
//         <p><i>"Making shopping easy & reliable"</i></p>

//         <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;" />
//         <footer style="font-size: 13px; color: #666; text-align: center;">
//           <p>📍 DropShop Pvt. Ltd., 123 Main Street, Pune, Maharashtra, India</p>
//           <p>📞 +91-9529647719 | ✉️ support@dropshop.com</p>
//           <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} DropShop. All rights reserved.</p>
//         </footer>
//       </div>
//     `,
//   };

//   return transporter.sendMail(mailOptions);
// };




const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "babartushar560@gmail.com",
    pass: "yror zqrv qpio mtdx", // Gmail app password
  },
});

// Send email function
exports.sendOrderEmail = (to, userName, productName, price, address) => {
  const mailOptions = {
    from: "babartushar560@gmail.com",
    to,
    subject: "🛒 Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2e6c80;">✅ Order Confirmed</h2>
        <p>Hi <b>${userName}</b>,</p>
        <p>Your order for <b>${productName}</b> has been placed successfully.</p>
        <p><b>Price:</b> ₹${price}</p>
        <p><b>Delivery Address:</b> ${address}</p>
        <p>We will deliver it soon 🚚</p>
        <br/>
        <p>If you have any questions, feel free to contact our support team at 
          <a href="mailto:support@quickcart.com">quickcart.com</a>.
        </p>
        <br/>
        <p>Thank you for shopping with us!</p>

        <br/>
        <p>Best Regards,</p>
        <p><b>quickcart Team</b></p>
        <p><i>"Making shopping easy & reliable"</i></p>

        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;" />
        <footer style="font-size: 13px; color: #666; text-align: center;">
          <p>📍 quickcart Pvt. Ltd., 123 Main Street, Pune, Maharashtra, India</p>
          <p>📞 +91-9529647719 | ✉️ support@quickcart.com</p>
          <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} quickcart. All rights reserved.</p>
        </footer>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
