const yargs = require('yargs');

const googleGeocode = require('./src/helpers/google-geocode');
const forecastIoWeather = require('./src/helpers/forecast-io-weather');

const argv = yargs
  .options({
    "a": {
      demand: true,
      alias: "address",
      describe: "the address you want to search for",
      string: true
    }

  })
  .help()
  .alias("help", "h")
  .argv;
let { address } = argv;

googleGeocode.coordinateRequest(address).then((res) => {
  forecastIoWeather.weatherRequest(res)
    .then((res) => {
      let { temperature, apparentTemperature } = res.currently;
      console.log('Current temprature:', temperature, 'Real Feel®:', apparentTemperature);
    });
}).catch((err) => {
  console.log(err)
});