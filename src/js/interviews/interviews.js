/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

let E = exports;

// Function that get prims elements of a number and prints them 60: outpuut should be 2, 2, 3, 5.
// In this case, the lang helps remove the unneeded ','.
E.dividers = num=>{
  let res = [];
  let _num = num;
  let i = 2
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
}

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
    num = num*10 + +d;
  }
  if (neg)
    num = num*(-1);
  return num;
}
