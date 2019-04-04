/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

const microtime = require('microtime');

const E = exports;

// Global debug logic
let g_debug;
E.debug = function(){
  if (!g_debug)
    return;
  console.log(Array.prototype.slice.call(arguments));
};
E.set_debug = function(val){ g_debug = val; };
Hash.prototype.isMember = function(prop){ return this._hash[prop] instanceof Tval; };
E.Hash = Hash;

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
  E.debug('InsersionSortLocation: num:', num, arr);
  let m;
  while (s<=e)
  {
    m = Math.floor((s+e)/2);
    E.debug(`${num}: s:${s}(${arr[s]}), m:${m}(${arr[m]}), e: ${e}(${arr[e]})`);
    if (arr[m] < num)
      s = m+1;
    else
      e = m-1;
  }
  E.debug(`end: num: ${num}, s:${s}(${arr[s]}), m:${m}(${arr[m]}), e: ${e}(${arr[e]})`);
  return m;
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
    let i = E.InsersionSortLocation(arr, 0, sl-1, arr[sl]);
    E.debug(`InsertSort(${arr}): Move element ${sl}(${arr[sl]}) to index ${i}`);
    // XXX yuval: Performance: Interesting to talk about it
    let e = arr[sl];
    arr.splice(sl, 1);
    arr.splice(i, 0, e);
    sl++;
    E.debug(`InsertSort(${arr})`);
  }
  return arr;
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

E.BubbleSort = arr=>{
  let found;
  do
  {
    found = false;
    for (let i = 0; i < arr.length-1; i++){
      E.debug(`bubbleSort(${arr}, i: ${i} ${arr[i]} > ${arr[i+1]} ? ${arr[i] > arr[i+1]}`);
      if (arr[i] > arr[i+1])
      {
        E.debug(`swapping ${arr[i]} with ${arr[i+1]}`);
        let t = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = t;
        found = true;
      }
    }
  } while(found);
  return arr;
};

let strcmp_cw = (n, ns, h, hs)=>
{
  if (ns.length-ns < h.length-hs)
    return false;
//  if ([ns] != '*' && n[ns] !=  
};


E.strcmp_cw = (n, h)=>strcmp_cw(n, 0, 0);

  /*
  let ii = 0; oi = 0;
  let qm = 0, ast = false;
  while (ii < i.length && oi < o.length)
  {
    if ((i[ii] == '?'){
      if (ast) // '?' directly after asterisk is meaningless. Ignore
        continue;
      qm++;
      ii++;
      continue;
    }
    if (i[ii] == '*'){
      if (qm>0) // asterisk after qm make the qm redundent
        qm = 0;
      ast = true;


    if (ast || qm)
    {
      if (i[ii] == o[oi])

    }

  }*/
