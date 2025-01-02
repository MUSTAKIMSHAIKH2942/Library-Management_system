const nodemailer = require('nodemailer');

const sendMail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

module.exports = sendMail;
