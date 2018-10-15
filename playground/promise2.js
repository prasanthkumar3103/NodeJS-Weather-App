const request = require('request');



var geocodeAddress = (address) => {
    return new Promise((resolve,reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCzQHLmIHXRfWAwrpv0bjvnCJz4_oKq6TM&address=' + encodedAddress,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status ==='OK') {
                // console.log(JSON.stringify(body, undefined, 2)); //displays the data in a nice way
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng     
                });
            }
        });
    });

};

geocodeAddress('32 sears road yatala').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});