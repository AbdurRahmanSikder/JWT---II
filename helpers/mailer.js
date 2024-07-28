console.log(process.env.SMTP_MAIL);
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});


const sendMail = async (email, subject, content) => {
    try {
        let mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred : ', error);
            }
            else {
                console.log("Mail sent : ", info.response);
            }
        });
    }
    catch (err) {
        console.log("Error : ", err.message);
    }
}

module.exports = { sendMail };