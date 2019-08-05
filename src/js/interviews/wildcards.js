/*jshint node: true,esversion: 6,globalstrict: true */
'use strict';

const E = exports;

let g_debug;
E.debug = function(){
  E.debug_rc.apply(undefined, [undefined, ...arguments]);
};
E.debug_rc = function(rc){
  if (!g_debug)
    return rc;
  if (rc!==undefined)
    console.log.apply(console, ['rc: '+rc, ...Array.prototype.slice.call(arguments, 1)]);
  else
    console.log.apply(console, Array.prototype.slice.call(arguments, 1));
  return rc;
};
  
E.set_debug = function(val){ g_debug = val; };

// Interview question: write function that find a needle in a haystack. Needle can have ? which stands for any
// single char. * can stands for any 0 or more sequence of chars

// First option: split the needle into parts according to *. Find each part after the end of the last part founded.
 
// Help function: Look for needle at the begining of the haystack
E._needle_in_haystack = (haystack, needle)=>{
    for (let i=0; i<needle.length; i++)
    {
        E.debug('haystack['+i+']='+haystack[i]+', needle['+i+']='+needle[i]);
        if (haystack[i] !== needle[i] && needle[i] !== '?')
            return -1;
    }
    return +needle.length;
};

E.needle_in_haystack = (haystack, needle)=>{
  for (let i=0; i<haystack.length; i++)
  {
    let rc = E._needle_in_haystack(haystack.substring(i), needle);
    if (rc != -1)
    {
      E.debug('rc: ', rc, 'i: ', i, i+rc);
      return parseInt(rc)+i;
    }
  }
  return -1;
};

E.strexists_wc_parts = (str, ptrn)=>{
    let parts = ptrn.split('*');
    let i = 0; //last index found
    for (let p in parts)
    {
        E.debug(parts[p]);
        if (p==='') // Multiple '*' in a raw. ptrn 'a*b' is equal to 'a**b' 
            continue;
        i = E.needle_in_haystack(str.substring(i), parts[p]);
        if (i == -1)
            return false;
    }
    return true;
};

// Recusive implementation:

E.strexists_wc_recusive = (str, ptr)=>{
    return E._strexists_wc_recusive(str, 0, ptr, 0);
};

E.count = 0;
E._strexists_wc_recusive = (str, si, ptr, pi)=>{
    E.debug(`1 ${E.count++} str: <${str}> ptr: <${ptr}>: str[${si}]=${str[si]} ptr[${pi}]=${ptr[pi]}`);
    if (pi == ptr.length)
        return E.debug_rc(true, '2 pi=='+pi, 'ptr.length: '+ptr.length);
    if (si == str.length)
        return E.debug_rc(false, '3 si=='+si, 'str.length: '+str.length);
    if (str[si] == ptr[pi] || ptr[pi] == '?')
    {
        E.debug(`3 E._strexists_wc_recusive(str, ${si+1}, ptr, ${pi+1})`);
        return E._strexists_wc_recusive(str, si+1, ptr, pi+1);
    }
    if (ptr[pi]=='*')
    {
        let i;
        for (i = pi; i < ptr.length && ptr[i]=='*'; i++) // count the number of consecutive '*'
            ;
        E.debug(`4.0: pi:${pi} i: ${i} str[${si}]=${str[si]} ptr[${i}]=${ptr[i]}`);
        return E._strexists_wc_recusive(str.substring(si), 0, ptr.substring(i+1));
    }
    pi = 0;
    E.debug(`6 E._strexists_wc_recusive(str, ${si+1}, ptr, ${pi})`);
    return E._strexists_wc_recusive(str, si+1, ptr, pi)
};

// API:
E.types = [
    {type: 'parts', func: E.strexists_wc_parts},
    {type: 'recursive', func: E.strexists_wc_recusive},
];
E.set_type = type=>E.types.forEach(function(e){
    if (e.type === type)
    {
        console.log('Setting strexist_wc to'+type);
        E.strexist_wc = e.func;
    }
});
