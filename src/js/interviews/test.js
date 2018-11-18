/*jshint node: true,esversion: 6,globalstrict: true,mocha: true*/
'use strict';

var assert = require('assert');
describe('myhash', function() {
  const Hash = require('./myhash.js').Hash;
  it('basic', function() {
    let h = new Hash();
    assert.deepEqual(h.entries(), []);
    h.first = 7;
    h.second = 8;
    assert.equal(h.first, 7);
    assert.equal(h.second, 8);
    assert.equal(h.somethingelse, undefined);
    assert.deepEqual(h.entries(), [['first', 7], ['second', 8]]);
  });
  it('global set', ()=>{
    let h = new Hash();
    h.first = 7;
    h.second = 8;
    h.set(9);
    assert.equal(h.first, 9);
    assert.equal(h.second, 9);
    assert.equal(h.somethingelse, undefined);
    assert.deepEqual(h.entries(), [['first', 9], ['second', 9]]);
    h.second = 1;
    assert.equal(h.first, 9);
    assert.equal(h.second, 1);
    assert.equal(h.somethingelse, undefined);
    assert.deepEqual(h.entries(), [['first', 9], ['second', 1]]);

  });
});

describe('interviews', function(){
  const interviews = require('./interviews.js');
  describe('dividers', function(){
    const t = (name, num, dividors)=>it(name, ()=>assert.deepEqual(interviews.dividers(num), dividors));
    t('basic', 60, [2, 2, 3, 5]);
    t('prime number', 7, [7]);
    t('multiple single dividor', 1024, [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
    t('2', 2, [2]);
    t('1', 1, [1]);
  });
  describe('str2int', function(){
    const t = (name, i, o)=>
      it(name, ()=>assert.equal(interviews.str2int(i), o));
    t('basic', '1234', 1234);
    t('plus', '+1234', 1234);
    t('plus ws1', ' +1234 ', 1234);
    t('ws tab', ' \t1234 ', 1234);
    t('ws tab plus', '     \t +1234 ', 1234);
    t('minus', '-1234', -1234);
    t('minus ws', ' -1234 ', -1234);
    t('minus ws tab', ' \t-1234', -1234);
    t('minus ws tab2', '\t -1234', -1234);
  });
});
