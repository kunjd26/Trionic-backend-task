import crypto from 'crypto';
import nodemailer from 'nodemailer';

// console.log(crypto.randomBytes(16).toString('hex'));


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

var mailOptions = {
    from: process.env.EMAIL_ID,
    to: 'kunjd26@gmail.com',
    subject: 'OTP for verification',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}); 