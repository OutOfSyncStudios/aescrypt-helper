// aescrypt.js

// Dependencies
const __ = require('@mediaxpost/lodashext');
const crypto = require('crypto');
const bsplit = require('buffer-split');

class AESCrypt {
  constructor(secret, iv, separator) {
    iv = iv || '';
    this.algo = 'aes-256-cbc';
    this.secret = Buffer.from(secret);
    this.iv = Buffer.from(iv);
    this.blockSeparator = separator || '$$$$';
  }

  test(data) {
    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return data.toString() === this.decrypt(this.encrypt(dataBuffer)).toString();
  }

  testiv(data) {
    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return data.toString() === this.decryptiv(this.encryptiv(dataBuffer)).toString();
  }

  getChunks(data) {
    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    const chunks = [];
    for (let itr = 0, jtr = dataBuffer.length; itr < jtr; itr += 15) {
      chunks.push(dataBuffer.slice(itr, itr + 15));
    }
    return chunks;
  }

  getCipher(secret, iv) {
    if (__.isUnset(iv)) {
      return crypto.createCipher(this.algo, secret);
    }
    return crypto.createCipheriv(this.algo, secret, iv);
  }

  getDecipher(secret, iv) {
    if (__.isUnset(iv)) {
      return crypto.createDecipher(this.algo, secret);
    }
    return crypto.createDecipheriv(this.algo, secret, iv);
  }

  enc(dataBuffer, secret, iv) {
    const cipher = this.getCipher(secret, iv);
    let crypt = cipher.update(dataBuffer);
    crypt += cipher.final('binary');
    return Buffer.from(crypt, 'binary');
  }

  dec(dataBuffer, secret, iv) {
    const decipher = this.getDecipher(secret, iv);
    let decrypt = decipher.update(dataBuffer);
    decrypt += decipher.final();

    return Buffer.from(decrypt);
  }

  encData(dataBuffer, secret, iv) {
    const out = [];
    const chunks = this.getChunks(dataBuffer);
    for (let itr = 0, jtr = chunks.length; itr < jtr; itr++) {
      out.push(this.enc(chunks[itr], secret, iv));
      out.push(Buffer.from(this.blockSeparator));
    }
    out.pop();

    return Buffer.concat(out);
  }

  decData(dataBuffer, secret, iv) {
    const out = [];
    const chunks = bsplit(dataBuffer, Buffer.from(this.blockSeparator));
    for (let itr = 0, jtr = chunks.length; itr < jtr; itr++) {
      out.push(this.dec(chunks[itr], secret, iv));
    }

    return Buffer.concat(out);
  }

  encrypt(data, secret) {
    secret = secret || this.secret;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.encData(dataBuffer, secret);
  }

  encryptiv(data, secret, iv) {
    secret = secret || this.secret;
    iv = iv || this.iv;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.encData(dataBuffer, secret, iv);
  }

  decrypt(data, secret) {
    secret = secret || this.secret;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.decData(dataBuffer, secret);
  }

  decryptiv(data, secret, iv) {
    secret = secret || this.secret;
    iv = iv || this.iv;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.decData(dataBuffer, secret, iv);
  }
}

module.exports = AESCrypt;
