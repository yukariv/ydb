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
let count = 0;
E.strexists_wc_recusive = (str, ptr)=>function _strexists_wc_recusive(str, ptr, initial){
	let _count = count++;
	E.debug(`${_count} initial: ${initial} str: <${str}> ptr: <${ptr}>: str[0]=${str[0]} ptr[0]=${ptr[0]}`);
    if (ptr.length==0)
        return E.debug_rc(true, `${_count} End of ptr return true`);
    if (str.length==0)
        return E.debug_rc(false, `${_count}: End of str return false`);
    let rc;
	if (ptr[0]=='*')
    {
        let i;
        for (i = 0; i < ptr.length && ptr[i]=='*'; i++) // count the number of consecutive '*'
            ;
		E.debug(`${_count}: * ${i}`);
        return E.debug_rc(_strexists_wc_recusive(str, ptr.substring(i), true), `${_count}: sub* ends, returning ${rc}`);
    }
    if (str[0] == ptr[0] || ptr[0] == '?')
	{
        rc = _strexists_wc_recusive(str.substring(1), ptr.substring(1));
		if (rc || !initial)
            return E.debug_rc(rc, `${_count}: sub ends, returning: ${rc}`);
	}
	if (!initial)
		return E.debug_rc(false, `${_count}: End middle, returning false`);
	E.debug(`${_count}: End initial, next`);
	return _strexists_wc_recusive(str.substring(1), ptr, true);
}(str, ptr, true);

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
