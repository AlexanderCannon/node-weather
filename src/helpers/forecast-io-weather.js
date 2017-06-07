request = require('request');

const apiKey = '0ec567d791bc08c3556edb5705bfe7d7';
const baseUrl = 'https://api.darksky.net/forecast/';

const weatherRequest = (data) => {
  return new Promise((resolve, reject) => {
    let { lat, lng } = data;
    const options = {
      url: `${baseUrl}${apiKey}/${lat},${lng}`,
      json: true
    }
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      }
      switch (res.statusCode) {
        case 200:
          resolve(body)
          break;
        case 404:
        case 400:
        default:
          reject('API request error');
          break;
      }
    });
  });
}

module.exports = {
  weatherRequest
}