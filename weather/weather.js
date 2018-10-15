const request = require('request');

var getWeather = (lat, lng, callback) => {
    
    var weatherOptions = {
        url: `https://api.darksky.net/forecast/c1c448edef5b5b6b93755f8b0e96d717/${lat},${lng}?units=si`,
        json: true
    };
    
    var weatherCallback = (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast.io server.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather');
        } else if (response.statusCode === 200) {
            var results = {
                temperature: body.currently.temperature
            }
            if (body.currently.apparentTemperature !== body.currently.temperature) {
                results.apparentTemperature = body.currently.apparentTemperature;
            } else {
                results.summary = body.currently.summary;
            }
            callback(undefined, results);    
        }
    }

    request(weatherOptions, weatherCallback);

}


module.exports = {
    getWeather
}