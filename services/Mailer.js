const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {

    //the first argument of constructor means that we are destructuring the key of the object that will be passed as an argument to the class when instantiating a new instance
    constructor({ subject, recipients}, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        //we defined the below such that we follow SendGrid requirements
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //just defining the body is not enough, we need to specifically register the content to the mailer after we added it
        this.addContent(this.body); //this addContent is built in with Mailer

        //we need to create the step allowing SendGrid to replace every link inside the body by its own so it could track user behavior toward responding
        this.addClickTracking();

        //we need to specifically add the list of object email of recipient created previously to the Mailer
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email}) => {
            return new helper.Email(email)
        })
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        })
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON(),
        })

        const response = this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;
