const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "quickcartpvt123@gmail.com",
    pass: "hvch qskw gpqd pbhc", // App password
  },
});

function generatePDF(data, filePath) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(24).text("QuickCart Invoice", { align: "center" });
    doc.moveDown(0.5);

    doc.fontSize(10).text("QuickCart Pvt Ltd.", { align: "center" });
    doc.text("Pune, Maharashtra, India", { align: "center" });
    doc.text("quickcartpvt123@gmail.com | +91 9529647719", { align: "center" });
    doc.moveDown();
    
    doc.moveTo(40, doc.y).lineTo(560, doc.y).stroke(); // divider
    doc.moveDown();

    // Order Info
    doc.fontSize(14).text(`Invoice Date: ${new Date().toLocaleString()}`);
   // doc.text(`Order ID: ${data.order_id}`);
    doc.moveDown(1);

    // Customer Info
    doc.fontSize(16).text("Customer Details", { underline: true });
    doc.fontSize(13).text(`Name: ${data.Name}`);
    doc.text(`Email: ${data.Email}`);
    doc.text(`Contact: ${data.contact}`);
    doc.text(`Address: ${data.address}`);
    doc.moveDown(1);

    // Product Info
    doc.fontSize(16).text("Order Details", { underline: true });
    doc.fontSize(13).text(`Product: ${data.product_name}`);
    doc.text(`Price: ₹${data.price}`);
    //doc.text(`Quantity: ${data.quantity}`);
    doc.text(`Payment Method: ${data.payment_method}`);
    //doc.text(`Total Amount: ₹${data.price * data.quantity}`);
    doc.moveDown(2);

    doc.fontSize(12).text("Thank you for shopping with QuickCart!", { align: "center" });
    doc.text("Visit Again ", { align: "center" });

    doc.end();
    stream.on("finish", resolve);
  });
}

exports.sendInvoiceEmail = async (data) => {
  const filePath = `invoice_${Date.now()}.pdf`;

  await generatePDF(data, filePath);

  const mailOptions = {
    from: "QuickCart <babartushar560@gmail.com>",
    to: data.Email,
    subject: `Your Invoice - Order #${data.order_id}`,
    html: `
      <h3>Hi ${data.Name}, 👋</h3>
      <p>Thanks for shopping with <b>QuickCart</b>!</p>
      <p>Your order has been successfully placed ✅</p>

      <h4>Order Summary:</h4>
      <ul>
        
        <li><b>Product:</b> ${data.product_name}</li>
        <li><b>Price:</b> ₹${data.price}</li>
       
        <li><b>Total:</b> ₹${data.price * data.quantity}</li>
        <li><b>Payment:</b> ${data.payment_method}</li>
      </ul>

      <p>Your invoice PDF is attached below 📎</p>

      <br>
      <b>Regards,</b><br/>
      <b>QuickCart Team</b>
    `,
    attachments: [{ filename: "Invoice.pdf", path: filePath }]
  };

  await transporter.sendMail(mailOptions);
  fs.unlinkSync(filePath);
};
