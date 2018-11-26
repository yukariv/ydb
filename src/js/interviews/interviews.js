/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

const microtime = require('microtime');

const E = exports;

let g_debug;

// Function that get prims elements of a number and prints them 60: outpuut should be 2, 2, 3, 5.
// In this case, the lang helps remove the unneeded ','.
E.dividers = num=>{
  let res = [];
  let _num = num;
  let i = 2;
  while (i <= Math.sqrt(_num))
  {
    let s = num/i;
    let n = Math.floor(s)*i;
    if (n==num)
    {
      res.push(i);
      num = s;
    }
    else
      i++;
  }
  if (!res.length)
    res.push(_num); // _num is a prime and its only dividor
  return res;
};

// convert string to int and signed. First non-digit is a stop

E.str2int = str=>{
  let num = 0;
  let neg = false;
  str = str.trim(str);
  if (str.length==0)
    return undefined;
  if (str[0] === '+')
    str = str.slice(1);
  if (str.length==0)
    return undefined;
  if (str[0] === '-')
  {
    str = str.slice(1);
    neg = true;
  }
  for (let i = 0; i < str.length; i++)
  {
    let d = str[i];
    if (isNaN(d))
      break;
    num = num*10 + (+d);
  }
  if (neg)
    num = num*(-1);
  return num;
};

// Binary search in a sorrted array (arr), where num should be added in order to keep the array sorted
E.InsersionSortLocation_loop = (arr, s, e, num)=>{
  let m = Math.floor((s+e)/2);
  E.debug('InsersionSortLocation: num:', num, arr);
  while (m<=e && m>=s)
  {
    E.debug(`${num}: s:${s}(${arr[s]}), m:${m}(${arr[m]}), e: ${e}(${arr[e]})`);
    if (arr[m] < num)
    {
      if (s==m)
        s = m+1;
      else
        s = m;
    }
    else
    {
      if (e==m)
        e = m-1;
      else
        e = m;
    }
    m = Math.floor((s+e)/2);
  }
  E.debug(`end: num: ${num}, s:${s}(${arr[s]}), m:${m}(${arr[m]}), e: ${e}(${arr[e]})`);
  return m+1;
};

E.InsersionSortLocation_recursion = (arr, s, e, num)=>{
  E.debug(`InsersionSortLocation_recursion(${arr}, ${s}, ${e}, ${num})`);
  if (e-s<2)
  {
    if (arr[e]<num)
      return e+1;
    if (arr[s]<num)
      return s+1;
    return s;
  }
  let m = Math.floor((s+e)/2);
  if (arr[m]<num)
    return E.InsersionSortLocation_recursion(arr, m, e, num);
  return E.InsersionSortLocation_recursion(arr, s, m, num);
};

E.InsersionSortLocation = (arr, s, e, num)=>{
  if (E.recurtion)
    return E.InsersionSortLocation_recursion(arr, s, e, num);
  return E.InsersionSortLocation_loop(arr, s, e, num);
};

E.InsersionSort = arr=>{
  let sl = 1; // Sorted length
  while (sl < arr.length)
  {

  }
  return [1, 1, 1, 1];
};

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
      E.debug(`get(${prop}): ts: ${target._data.tval.timestamp}, gts: ${target[prop].timestamp} rc: ${rc}`);
      return rc;
    },
    set: (target, prop, val)=>{
      target[prop] = new Tval(val);
      E.debug(`set(${prop}, ${val}): ts: ${target[prop].timestamp}`);
      return true;
    },
  });
}

Hash.prototype.entries = function(){
  let self = this._hash;
  return Object.entries(self).filter(([key, value]) => self.isMember(key)).map(([key, value]) => [key, this[key]]);
};
Hash.prototype.set = function(val) {
  if (this._data===undefined)
    this._data = {};
  this._data.tval = new Tval(val);
  E.debug(`Hash.set(${val}), ${this._data.tval.timestamp}`);
};
E.debug = function(){
  if (!g_debug)
    return;
  console.log(Array.prototype.slice.call(arguments));
};
E.set_debug = function(val){ g_debug = val; };
Hash.prototype.isMember = function(prop){ return this._hash[prop] instanceof Tval; };
E.Hash = Hash;
