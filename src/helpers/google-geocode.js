const request = require('request');

const coordinateRequest = (address) => {
  const options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      let latLng = {};
      if (err) {
        reject(`Error when requesting google with${JSON.stringify(err, undefined, 2)}`);
      }
      switch (body.status) {
        case 'ZERO_RESULTS':
          reject('Enter a valid address');
          break;
        case "OK":
          resolve(getLatLng(body))
          break;
      }
    });
  });
}

const getLatLng = (body) => {
  let { geometry } = body.results[0];
  values = { lat, lng } = geometry.location;
  values.address= body.results[0].formatted_address
  return values;
}

module.exports = {
  coordinateRequest
};