/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

const E = module.exports;

E.async = function(cb){
  let generator = cb.apply(this, arguments);
  let handle = result=>{
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(res=>{
      return handle(generator.next(res));
    }, err=>handle(generator.throw(err)));
  };
  try { return handle(generator.next()); }
  catch (ex) { return Promise.reject(ex); }
};
