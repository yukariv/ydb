/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

// API:

const async = function (makeGenerator){
  let generator = makeGenerator.apply(this, arguments);
  let handle = result=>{
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(res=>{
      return handle(generator.next(res));
    }, err=>handle(generator.throw(err)));
  };
  try { return handle(generator.next()); }
  catch (ex) { return Promise.reject(ex); }
};

const delay = t=>new Promise(resolve=>setTimeout(resolve, t));

// Sample usage:

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
    console.log('rc: ', rc);
    console.log(yield a2(yield async(a1)));
});
