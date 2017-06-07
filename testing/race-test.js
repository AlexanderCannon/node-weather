console.log('starting');

var i = 1;
console.log('finishing');

function callback() {
  i++
  console.log(`race? ${i}`);
}

setTimeout(callback, 1000);

setTimeout(callback, 0);