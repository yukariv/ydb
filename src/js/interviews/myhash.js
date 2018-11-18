/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

const microtime = require('microtime');

function Tval(val){
  this.val = val;
  this.timestamp = microtime.now();
}

function Hash(def=0){
  this.set(def);
  this._hash = this;
  return new Proxy(this, {
    get: (target, prop)=>{
      if (!target.isMember(prop))
        return target[prop];
      const val = target[prop];
      if (!target[prop])
        return undefined;
      let rc;
      if (target._data.tval.timestamp > target[prop].timestamp)
        rc = target._data.tval.val;
      else
        rc = target[prop].val;
      target.pdebug(`get(${prop}): ts: ${target._data.tval.timestamp}, gts: ${target[prop].timestamp} rc: ${rc}`);
      return rc;
    },
    set: (target, prop, val)=>{
      target[prop] = new Tval(val);
      target.pdebug(`set(${prop}, ${val}): ts: ${target[prop].timestamp}`);
      return true;
    },
  });
}

Hash.prototype.debug = function(val){ this._data.debug = val; };
Hash.prototype.entries = function(){
  let self = this._hash
  return Object.entries(self).filter(([key, value]) => self.isMember(key)).map(([key, value]) => [key, this[key]]);
};
Hash.prototype.pdebug = function(){
  if (this._data===undefined || !this._data.debug)
    return;
  console.log(Array.prototype.slice.call(arguments));
};
Hash.prototype.set = function(val) {
  if (this._data===undefined)
    this._data = { debug: false };
  this._data.tval = new Tval(val);
  this.pdebug(`Hash.set(${val}), ${this._data.tval.timestamp}`);
};
Hash.prototype.isMember = function(prop){ return this._hash[prop] instanceof Tval; };

exports.Hash = Hash;
