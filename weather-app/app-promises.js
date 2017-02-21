const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describ: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error(console.log("Unable to connect to Google servers"));
    }
    console.log(response.data.results[0].formatted_address)
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/efcaa2869a5b20805357a03ad44d2ca3/${latitude},${longitude}`

    return axios.get(weatherUrl)
}).then((response) => {
    var currentlyTemperature = (response.data.currently.temperature - 32) * (5 / 9);
    var apparentTemperature = (response.data.currently.apparentTemperature - 32) * (5 / 9);
    console.log(`Currently temperature is ${currentlyTemperature}, but it feels like ${apparentTemperature}`);

}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Anable to connect to API servers.')
    } else {
        console.log(e.message)
    }
});

