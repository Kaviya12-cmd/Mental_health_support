const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken && !accountSid.includes('your_account_sid') ? new twilio(accountSid, authToken) : null;

const sendSMS = (to, body) => {
    if (!client) {
        console.warn("Twilio not configured. Skipping SMS:", body);
        return;
    }

    // Basic formatting for India or US numbers if needed
    // Assuming 'to' is a 10-digit number, prepend +91 for India if not present
    let formattedNumber = to;
    if (!formattedNumber.startsWith('+')) {
        // Default to India +91 if 10 digits provided
        if (formattedNumber.length === 10) {
            formattedNumber = `+91${formattedNumber}`;
        }
    }

    client.messages
        .create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedNumber,
        })
        .then((message) => console.log(`SMS sent: ${message.sid}`))
        .catch((error) => console.error(`Error sending SMS: ${error.message}`));
};

module.exports = sendSMS;
