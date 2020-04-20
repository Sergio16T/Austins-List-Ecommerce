const nodeMailer = require("nodemailer"); 
require('dotenv').config(); 

const transport = nodeMailer.createTransport({
    // host: process.env.MAIL_HOST, 
    // port: process.env.MAIL_PORT, 
    service: 'gmail', 
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }, 
}); 

const email = text => `
<div className="email" style="
border: 1px solid black;
padding: 20px; 
font-family: sans-serif; 
line-height: 2; 
font-size: 20px; 
">
<h2> Hello There!</h2> 
<p>${text}</p> 
<p> Sergio Tapia-Fikes</p> 
</div>`;

const confirmationEmail = table => `
<div className="email" style="
padding: 10px; 
font-family: sans-serif; 
line-height: 2; 
font-size: 14px; 
text-align: left; 
">
<h2>Order Confirmation</h2> 
<div>
${table} 
</div>
<p style="font-size: 14px"> Austin's List </p> 
</div>`
exports.transport= transport; 
exports.email = email; 
exports.confirmationEmail = confirmationEmail; 
