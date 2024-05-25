import nodemailer from "nodemailer";

export const sendEmail = async (req,res) => {
  // console.log(req.body)
try{
  const data = req.body
  const transporter = nodemailer.createTransport({  
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.MYPASS,
    },
  });

  const buyerOptions = {
    from: {name:data.sellerFirstName,address:process.env.MYEMAIL},
    to: data.buyerEmail,
    subject: "Regard your Interest in property shown at Rentify",
    text: `We recently found that you shown your Intereest at this property ${data.path}
    This Property is belongs to ${data.sellerFirstName} ${data.sellerLastName} Phone Number - ${data.sellerPhone} Email - ${data.sellerEmail} 
    You can contact on this Email and number for your further Queries , Thank you Rentify`,
  };
  const sellerOptions = {
    from: {name:"Rentify",address:process.env.MYEMAIL},
    to: data.sellerEmail,
    subject: "We got a New Buyer's Interest at Rentify",
    text: `This below is details of Interested Customer ${data.buyerFirstName} ${data.buyerLastName} Phone Number - ${data.buyerPhone} Email - ${data.buyerEmail} 
    You can contact on this Email and number for your further Queries , Thank you Rentify`,
  };

  transporter.sendMail(buyerOptions);
  transporter.sendMail(sellerOptions);
  res.status(200).json({
    success: true,
    message: "Interest sent successfully",
  });
} catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message,
    });
};
}
