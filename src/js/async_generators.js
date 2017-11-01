/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

// API:

const async = makeGenerator=>(()=>{
  let generator = makeGenerator.apply(this, arguments);
  let handle = result=>{
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(res=>{
      return handle(generator.next(res));
    }, err=>handle(generator.throw(err)));
  };
  try { return handle(generator.next()); }
  catch (ex) { return Promise.reject(ex); }
})();

const delay = t=>new Promise(resolve=>setTimeout(resolve, t));

// Sample usage:

async(function*my_generator(){
  yield delay(1000);
  console.log(1);
  yield delay(2000);
  return 7;
}).then(rc=>console.log(rc));
