// test/index.js

// Dependancies
const chai = require('chai');
const expect = chai.expect;

const crypto = require('crypto');
const AESCryptHelper = require('../');

const secret = '41e8c08ff31f97547ac11cc47c29f8ce5cb187a70ef09226c0f025c25c55b5b3';
const iv = '3816d1474cf82f3182b83c390d3e8eb5';
const creds = { secret: null, iv: null };

const teststr = 'asdfqwerty-asdfwe234';
let secretBytes;
let secretHash;

let testStrEnc, testStrDec;

let aescyptHelper;

describe('AESCrypt Helper', () => {
  before(async() => {
    creds.secret = Buffer.from(secret, 'hex');
    creds.iv = Buffer.from(iv, 'hex');
    aescyptHelper = new AESCryptHelper(creds.secret, creds.iv);
    secretBytes = crypto.randomBytes(32);
    secretHash = await Buffer.from(crypto.createHmac('sha256', creds.secret).update(secretBytes)
      .digest('hex'));
  });

  it('constructor', () => {
    expect(aescyptHelper).to.be.an.instanceof(AESCryptHelper);
  });

  it('encrypt test string', () => {
    testStrEnc = aescyptHelper.encrypt(teststr);
    expect(testStrEnc).to.not.equal(teststr);
  });

  it('decrypt test string', () => {
    testStrDec = aescyptHelper.decrypt(testStrEnc).toString();
    expect(testStrDec).to.not.equal(testStrEnc);
    expect(testStrDec).to.equal(teststr);
  });

  it('test encrypt/decrypt of test string', () => {
    expect(aescyptHelper.test(teststr)).to.equal(true);
  });

  it('encryptIV test string', () => {
    testStrEnc = aescyptHelper.encryptiv(teststr);
    expect(testStrEnc).to.not.equal(teststr);
  });

  it('decryptIV test string', () => {
    testStrDec = aescyptHelper.decryptiv(testStrEnc).toString();
    expect(testStrDec).to.not.equal(testStrEnc);
    expect(testStrDec).to.equal(teststr);
  });

  it('test encrypt/decrypt IV of test string', () => {
    expect(aescyptHelper.testiv(teststr)).to.equal(true);
  });

  it('encrypt random string', () => {
    testStrEnc = aescyptHelper.encrypt(secretHash);
    expect(testStrEnc).to.not.equal(secretHash.toString());
  });

  it('decrypt random string', () => {
    testStrDec = aescyptHelper.decrypt(testStrEnc).toString();
    expect(testStrDec).to.not.equal(testStrEnc);
    expect(testStrDec).to.equal(secretHash.toString());
  });

  it('test encrypt/decrypt of random string', () => {
    expect(aescyptHelper.test(secretHash)).to.equal(true);
  });

  it('encryptIV random string', () => {
    testStrEnc = aescyptHelper.encryptiv(secretHash);
    expect(testStrEnc).to.not.equal(secretHash.toString());
  });

  it('decryptIV random string', () => {
    testStrDec = aescyptHelper.decryptiv(testStrEnc).toString();
    expect(testStrDec).to.not.equal(testStrEnc);
    expect(testStrDec).to.equal(secretHash.toString());
  });

  it('encryptIV random string w/ blockSeparator', () => {
    aescyptHelper.blockSeparator = '$$$$';
    testStrEnc = aescyptHelper.encryptiv(secretHash);
    expect(testStrEnc).to.not.equal(secretHash.toString());
  });

  it('decryptIV random string w/ blockSeparator', () => {
    testStrDec = aescyptHelper.decryptiv(testStrEnc).toString();
    expect(testStrDec).to.not.equal(testStrEnc);
    expect(testStrDec).to.equal(secretHash.toString());
  });

  it('test encrypt/decrypt IV of random string', () => {
    expect(aescyptHelper.testiv(secretHash)).to.equal(true);
  });
});
