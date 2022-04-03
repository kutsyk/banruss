const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const key = 'c345f2a567bf42d694dfe217f1af342c';
const endpoint = 'https://cs-ban-russ.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const
    express = require('express'),
    router = express.Router();

const handleError = (err, res) => {
    res.status(500);
    res.render('error', { error: err });
};

router.get('/', async (req, res, next) => {
    let imageName = req.query.imageName;
    console.log(imageName);

    // res.render('success', {
    //     message: imageName
    // });

    const brandURLImage = `https://banruss.blob.core.windows.net/photos/${imageName}`;

    console.log(brandURLImage);

    // Analyze URL image
    console.log('Analyzing brands in image...', brandURLImage.split('/').pop());
    const brands = (await computerVisionClient.analyzeImage(brandURLImage, { visualFeatures: ['Brands'] }));
    console.log(brands);
    // Print the brands found
    // if (brands.length) {
    //     console.log(`${brands.length} brand${brands.length != 1 ? 's' : ''} found:`);
    //     for (const brand of brands) {
    //         console.log(`    ${brand.name} (${brand.confidence.toFixed(2)} confidence)`);
    //     }
    // } else { console.log(`No brands found.`); }
    res.setHeader('Content-Type', 'application/json');
    res.send(brands);
});

module.exports = router;