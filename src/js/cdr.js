#!/usr/bin/node
'use strict';
const fs = require('fs');
const path = require('path');

const MAX_DEPTH = 20;
const marker = '.git';

const err = (...s)=>{ console.error(...s); process.exit(1); };
const found = d=>console.log(d);
const main = ()=>{
  let d = path.normalize(process.cwd());
  for (let i = 0; i < MAX_DEPTH; i++){
    if ('/'==d || ''==d)
      err('Failed to find github repo before reaching root');
    let files;
    try { files = fs.readdirSync(d); }
    catch (e){ err('Failed readdir: ', d, e); }
    for (let f of files){
      if (f==marker)
        return found(d);
    }
    d = d.replace(/\/[^/]+$/, '');
  }
    
  return 0;
};

process.exit(main());
