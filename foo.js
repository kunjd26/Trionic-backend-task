import crypto from 'crypto';
import nodemailer from 'nodemailer';

// console.log(crypto.randomBytes(16).toString('hex'));


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'd23cs097@charusat.edu.in',
        pass: 'vnzn bfsj fzwt zypj '
    }
});

var mailOptions = {
    from: 'd23cs097@charusat.edu.in',
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