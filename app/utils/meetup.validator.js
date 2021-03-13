const axios = require('axios');
const Filter = require('bad-words'); // profanity checker
const filter = new Filter();

// for 'GET' requests
let getRequest = async url => {
    const data = await axios.get(url);
    return data.data;
}

// validate data
exports.validateMeetup = async (req, _cb) => {
    let statusCode = 200, statusData = {};
    await (async () => {
        // let's validate stuff
        // profanity
        for (let param in req.body) {
            //console.log(`> ${req.body[param]}`);
            if (filter.isProfane(param)) {
                statusCode = 400; statusData = {error: "uhh", message: "what the hell are you doing?"};
                return;
            };
            if (filter.isProfane(req.body[param])) {
                statusCode = 400; statusData = {error: "profanity", message: "No profanity / vulgar language."};
                return;
            };
        };

        // title
        if (!req.body.title) {
            statusCode = 400; statusData = {error: "no-title", message: "Please enter a valid title."};
            return;
        };
        if (req.body.title.length > 48) {
            statusCode = 400; statusData = {error: "too-long-title", message: "Too long title."};
            return;
        };

        // subtitle
        if (!req.body.subtitle) {
            statusCode = 400; statusData = {error: "no-subtitle", message: "Please enter a valid subtitle."};
            return;
        };
        if (req.body.subtitle.length > 64) {
            statusCode = 400; statusData = {error: "too-long-subtitle", message: "Too long subtitle"};
            return; 
        }

        // address
        if (!req.body.address) req.body.address = "Unknown, address negotiable with the contact";

        // imageUrl
        if (!req.body.imageUrl) req.body.imageUrl = null;

        // description
        if (!req.body.description) {
            statusCode = 400; statusData = {error: "no-description", message: "Please enter a valid description"};
            return;
        };
        if (req.body.description.length > 512) {
            statusCode = 400; statusData = {error: "too-long-description", message: "Too long description"};
            return;
        };

        // isFav
        req.body.isFavorite ? req.body.isFavorite : req.body.isFavorite = false;

        // contactEmail
        if ((!req.body.contactEmail) || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.contactEmail))) {
            statusCode = 400; statusData = {error: "invalid-contact-email", message: "Please enter a valid email address."};
            return;
        };

        // fuck this! im not gonna pay for more email check requests. let's stay with basic disposable mail check!
        //let data = await getRequest(`https://api.kickbox.com/v2/verify?email=${req.body.contactEmail}&apikey=${process.env.KICKBOX_API}`);
        let data = await getRequest(`https://open.kickbox.com/v1/disposable/${req.params.contactEmail}`)
        //return console.log(data);

        if (data.disposable) {
            statusCode = 400; statusData = {
                error: 'disposable-email',
                message: 'Contact email address is disposable.',
                contactEmail: req.body.contactEmail
            };
            return;
        };

        // switch (data.result) {
        //     case 'undeliverable':
        //         if (data.reason === 'rejected_email') {
        //             statusCode = 400; statusData = {
        //                 error: 'email-addr-not-found',
        //                 message: 'Contact email address not found or valid.',
        //                 contactEmail: req.body.contactEmail
        //             };
        //             return;
        //         };
        //     case 'unknown':
        //         if (data.reason === 'no_connect') {
        //             statusCode = 400; statusData = {
        //                 error: 'invalid-email',
        //                 message: 'Contact email address invalid, failed to connect to SMTP mail server.',
        //                 contactEmail: req.body.contactEmail
        //             };
        //         };
        //         return;
        //     case 'risky':
        //         if ((data.reason === 'low_deliverability') || (data.reason === 'low_quality')) {
        //             statusCode = 400; statusData = {
        //                 error: 'risky-email',
        //                 message: 'Contact email address has been marked as risky due to low deliverability / quality.',
        //                 contactEmail: req.body.contactEmail,
        //                 disposable: data.disposable
        //             };
        //         };
        //         return;
        //     case 'deliverable':
        //         statusCode = 200; statusData = 'OK';
        //         return;
        //     default:
        //         statusCode = 500; statusData = data;
        //         return;
        // };
        _cb({statusCode, statusData});
    })();
};
