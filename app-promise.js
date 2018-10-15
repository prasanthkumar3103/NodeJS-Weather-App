const yargs = require('yargs');
const axios = require('axios');

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


var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCzQHLmIHXRfWAwrpv0bjvnCJz4_oKq6TM&address=' + encodedAddress;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that adress.')
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/c1c448edef5b5b6b93755f8b0e96d717/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var summary = response.data.currently.summary;
    if (apparentTemperature === temperature) {
        console.log(`The weather is ${summary} with a temperature of ${temperature}`);
    } else {
        console.log(`The temperature feels like ${apparentTemperature} but it is actually ${temperature}`);
    }
    console.log(``)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to find API servers.')
    } else {
        console.log(e.message);
    }
});