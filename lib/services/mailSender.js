const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Créer un seul transporteur avec les options communes
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = class MailSender {

    async sendWelcomeEmail(email) {
        // Define email options
        let mailOptions = {
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: 'Welcome stranger', // Subject line
            text: 'Welcome to our incredible application about Javascript Wagon Train as know as JWT !', // plain text body
            html: '<b>Welcome to our incredible application about Javascript Wagon Train as know as JWT !</b>' // HTML body content
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async sendNewBookEmail(email, title) {
        // Define email options
        let mailOptions = {
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: 'New book is release', // Subject line
            text: `Let's check our new book ${title}`, // plain text body
            html: `<b>Let's check our new book ${title}</b>` // HTML body content
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async sendUpdatedBookEmail(email, title) {
        // Define email options
        let mailOptions = {
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: 'Book has been updated', // Subject line
            text: `One of your favorite book has been updated : ${title}`, // plain text body
            html: `<b>One of your favorite book has been updated : ${title}</b>` // HTML body content
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

}
