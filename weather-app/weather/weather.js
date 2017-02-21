const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/efcaa2869a5b20805357a03ad44d2ca3/${latitude},${longitude}`,
        json: true,

    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature - 32) * (5/9),
                apparentTemperature: (body.currently.apparentTemperature - 32) * (5/9)
            });
        } else {
            callback('Unable to feth weather.');
        }
    })
}

module.exports.getWeather = getWeather;