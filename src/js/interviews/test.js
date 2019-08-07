/*jshint node: true,esversion: 6,globalstrict: true,mocha: true*/
'use strict';

var assert = require('assert');
describe('interviews', function(){
  const interviews = require('./interviews.js');
  interviews.set_debug(false);
  describe('wildcards', function() {
    const wildcards = require('./wildcards.js');
    const str = 'my name is inigo montoya, you killed my father, prepare to die';
	describe('normalize', function() {
	  const t = (name, str, exp)=>it(name, ()=>assert.equal(wildcards.normalize(str), exp));
	  t('noast', 'abcd', 'abcd');
	  t('same', '*ab*12*c*', '*ab*12*c*');
	  t('normalize', '**a*b***c*d**12***', '*a*b*c*d*12*');
	});
    describe('needle_in_haystack', function() {
      let t = (name, haystack, n, exp)=>it(name, ()=>assert.equal(wildcards.needle_in_haystack(haystack, n), exp));
      let h = str;
      t('middle', h, 'name', 7);
      t('start', h, 'my n', 4);
      t('end', h, 'to die', 62);
      t('questionmark', h, 'mon?oya', 24);
      t('questionmark false', h, 'mon?toya', -1);
      t('fail', h, 'monttoya', -1);
      h = 'test1 test2 test3';
      t('subfoundFirst', h, 'test1', 5);
      t('subfoundSecond', h, 'test2', 11);
    });
    describe('strexist_wc', function() {
      let tests = type=>{
        describe(type, function() {
          before(function(){
            wildcards.set_type(type);
          });
          let t = (name, haystack, n, exp)=>it(name, ()=>assert.equal(wildcards.strexist_wc(haystack, n), exp));
          t('basic', str, 'name', true);
          t('basic false', str, 'nae', false);
          t('asterisk', str, 'my*montoya', true);
          t('multi_asterisk', str, 'my**mon*to****a', true);
          t('asterisk false', str, 'my*montoa', false);
          t('asterisk+qm', str, 'my n?me*montoya', true);
          t('asterisk+qm false', str, 'my n?me*montoya', true);
        });
     };
     tests('parts');
     tests('recursive');
	 tests('recursive_for');
    });
  }); 
  describe('myhash', function() {
    const Hash = interviews.Hash;
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
      /*jshint -W069 */
      h['first'] = 7; /*jshint +W069 */
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
  describe('InsersionSortLocation', function(){
    const _t = recurtion=>{
      const t = (name, arr, num, idx)=>it(name, ()=>{
        interviews.recurtion = recurtion;
        assert.deepEqual(interviews.InsersionSortLocation(arr, 0, arr.length-1, num), idx);
      });
      let tArr = [1, 4, 7, 11, 15];
      t('after the first', tArr, 2, 1);
      t('mid', tArr, 8, 3);
      t('end', tArr, 12, 4);
      t('start', tArr, 0, 0);
    };
    describe('loop', ()=>_t(false));
    describe('recurtion', ()=>_t(true));
  });
  describe('TESTInsersionSort', function(){
    const t = (name, i, o)=>it(name, ()=>assert.deepEqual(interviews.InsersionSort(i), o));
    t('basic', [2, 1, 3, 0], [0, 1, 2, 3]);
  });
  describe('bubbleSort', function(){
    const t = (name, i, o)=>it(name, ()=>assert.deepEqual(interviews.BubbleSort(i), o));
    t('basic sort', [3, 2, 4, 1], [1, 2, 3, 4]);
    t('sorted', [1, 2, 3, 4], [1, 2, 3, 4]);
    t('reversed', [4, 3, 2, 1], [1, 2, 3, 4]);
    t('repeeted numbers', [3, 3, 1, 4, 1, 2], [1, 1, 2, 3, 3, 4]);
  });
/*
  describe('strcmp_cw', function(){
    const t = (name, s1, s2, o)=>it(name, ()=>assert.equal(interviews.strcmp_cw(s1, s2), o));
    describe('basic', function(){
      t('matched', 'test', 'test', true);
      t('not matched', 'test', 'Tested', false);
      t('suffix', 'test', 'test2', false);
      t('prefix', 'test', '1test', false);
    });
    describe('wildcards', function(){
      t('prefix ast', '*val', 'yuval', true);
      t('suffix ast', 'yu*', 'yuval', true);
      t('ast', 'yu*l', 'yuval', true);
      t('prefix qm', '?uval', 'yuval', true);
      t('suffix qm', 'yuva?', 'yuval', true);
      t('qm', 'yu?al', 'yuval', true);
      t('qm 2chars', 'yu?l', 'yuval', false);
      t('2qm seq', 'yu??l', 'yuval', true);
      t('2qm ', 'y?v?l', 'yuval', true);
      // TODO: many more
    });
  });
*/
});
