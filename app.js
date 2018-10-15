console.log('────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//32 sears rd yatala
const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var geocodeAddressCallback = (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address: ${results.address}`);
        weather.getWeather(results.latitude, results.longitude, getWeatherCallback);
    }
};

var getWeatherCallback = (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        if (results.summary) {
            console.log(`The weather is ${results.summary} with a temperature of ${results.temperature}`);
        } else {
            console.log(`The temperature feels like ${results.apparentTemperature} but it is actually ${results.temperature}`);
        }
    }
};

geocode.geocodeAddress(argv.a, geocodeAddressCallback);





