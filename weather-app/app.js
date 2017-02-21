const yargs = require('yargs');
const weather = require('./weather/weather.js');


const geocode = require('./geocode/geocode')

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

geocode.geocodeAdress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage)
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(`It is ${weatherResults.temperature}º Celcius. And it feels like ${weatherResults.apparentTemperature}º Celcius.`);
            }
        })
    }
});

