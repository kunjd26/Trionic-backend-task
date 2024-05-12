import nodemailer from 'nodemailer';
import "dotenv/config";

export default function sendOTPEmail(email, otp, callback) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'OTP for verification',
        text: `Your OTP for verification is ${otp},\nDo not share it with anyone.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(false);
        } else {
            callback(true);
        }
    });
}