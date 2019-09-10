const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const HelperModule = require('../helper')
let customFunctions= {
    sendEmail: function (from, to, subject, text, html) {
        const msg = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };
        return sgMail.send(msg).then(() => {
            return "OK"
        }).catch(error => {
            console.error(error.toString());
            throw error
        });
    }
}
let cloudFunctions= {
    send: function(req){
        HelperModule.validator.requireParams(req,
            ['subject', 'to', 'text','html']
        );
        let from= 'mfkenson@gmail.com',
            to= req.params.to,
            subject= req.params.subject,
            text= req.params.text,
            html= req.params.html;

        return customFunctions
            .sendEmail(from, to, subject, text, html)

    }
}

module.exports = {
    cloudFunctions: cloudFunctions
};
