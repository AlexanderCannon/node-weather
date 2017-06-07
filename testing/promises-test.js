var request = require('request');

// const asyncAdd = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (typeof a === 'number' && typeof b === 'number') {
//         resolve(a + b);
//       } else {
//         reject('args must be numbers')
//       }
//     }, 1500);
//   });
// };
// let a = 2,
//   b = 2
// asyncAdd(a, b).then((res) => {
//   console.log(a, 'plus', b, 'is', res);
//   return asyncAdd(res, 4);
// }).then((res) => {
//   console.log(4, 'plus', 4, 'is', res);
// }).catch((err) => {
//   console.log(err);
// });

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('done a promise');
//     reject('Promise failed');
//   }, 2000);
// });

// somePromise.then((message) => {
//   console.log(message);
// }, (err) => {
//   console.log(err);
// })

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
  values.address = body.results[0].formatted_address
  return values;
}

coordinateRequest('hp136hn').then((loc) => {
  console.log(JSON.stringify(loc, undefined, 2));
}).catch((err) => {
  console.log(err)
});