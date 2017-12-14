/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

let async = require('./yasync').async;

const delay = t=>new Promise(resolve=>setTimeout(resolve, t));

// Sample usage:
async(function*(){
  yield delay(1000);
  console.log(1);
  yield delay(2000);
  console.log(2);
  yield delay(1000);
  console.log('this print is seems to be written sync in code, but actually async after all delays');
});

/* A bit more complex
function*a1(t1, t2, msg, rc){
  yield delay(t1||1000);
  console.log(msg||1);
  yield delay(t2||2000);
  return rc||7;
}

const a2 = i=>async(function*(){
    yield delay(1000);
    return i;
});

async(function*(){
    let rc = yield async(a1, 1000, 1000, 'MSG', 8);
// After 2 seconds
    console.log('rc: ', rc);
    console.log(yield a2(yield async(a1)));
});
*/
