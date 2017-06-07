const yargs = require('yargs');
const axios = require('axios');

const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const weatherApiKey = '0ec567d791bc08c3556edb5705bfe7d7';
const weatherUrl = 'https://api.darksky.net/forecast/';

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

geocodeRequest= `${geocodeUrl}${encodeURIComponent(address)}`

axios.get(geocodeRequest).then((res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the chosen address');
  }
  let { lat, lng } = res.data.results[0].geometry.location;
  console.log(res.data.results[0].formatted_address);
  return axios.get(`${weatherUrl}${weatherApiKey}/${lat},${lng}`).then((res) => {
    let { temperature, apparentTemperature } = res.data.currently;
      console.log('Current temprature:', temperature, 'Real Feel®:', apparentTemperature);
  });
}).catch((err) => {
  if (err.code == 'ENOTFOUND') {
    console.log('Can\'t connect to api service');
  } else {
    console.log(err.message);
  }
});