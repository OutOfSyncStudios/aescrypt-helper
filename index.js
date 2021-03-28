// aescrypt.js

// Dependencies
const crypto = require('crypto');

/**
 * Creates a new AESCrypt helper that wraps the Node crypto Standard Library
 * for `aes-256-cbc` encryption
 * largest block size.
 * 
 * @param {string} secret The secret key to use for the encryption/decryption
 * @param {string} iv The initialization vector for the encryption/decryption
 * @class AESCrypt
 */
class AESCrypt {
  constructor(secret, iv) {
    iv = iv || Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 0, 16);
    this.algo = 'aes-256-cbc';
    this.secret = Buffer.from(secret);
    this.iv = Buffer.from(iv);
  }

  /**
   * (Deprecated) Test a value set this this cipher encrypts and then decrypts successfully
   *
   * @param {*} data
   * @return {*} 
   * @memberof AESCrypt
   * @deprecated Please use `testiv`
   */
  test(data) {
    return this.testiv(data);
  }

  /**
   * Test a value set with this cipher encrypts and then decrypts successfully
   *
   * @param {*} data
   * @return {*} 
   * @memberof AESCrypt
   */
  testiv(data) {
    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return data.toString() === this.decryptiv(this.encryptiv(dataBuffer)).toString();
  }

  /**
   * Slices a Buffer into an array of Buffers of max length `len`
   *
   * @param {Buffer} data Buffer data to chunk
   * @param {integer} len The size of each buffer chunl
   * @return {Buffer[]}
   * @memberof AESCrypt
   */
  getChunks(data, len) {
    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    const chunks = [];
    for (let itr = 0, jtr = dataBuffer.length; itr < jtr; itr += len) {
      chunks.push(dataBuffer.slice(itr, itr + len));
    }
    return chunks;
  }

  /**
   * Return a cipher for aes-256-cbc encryption
   *
   * @param {*} [secret]
   * @param {*} [iv]
   * @return {Cipher} 
   * @memberof AESCrypt
   */
  getCipher(secret, iv) {
    return crypto.createCipheriv(this.algo, secret || this.secret, iv || this.iv);
  }

  /**
   * Return a decipher for aes-256-cbc encryption
   *
   * @param {Buffer} [secret]
   * @param {Buffer} [iv]
   * @return {Decipher}
   * @memberof AESCrypt
   */
  getDecipher(secret, iv) {
    return crypto.createDecipheriv(this.algo, secret || this.secret, iv || this.iv);
  }

  /**
   * Perform aes-256-cbc encryption on a data block
   *
   * @param {Buffer} dataBuffer
   * @param {Buffer|string} secret
   * @param {Buffer|string} iv
   * @return {Buffer} 
   * @memberof AESCrypt
   */
  enc(dataBuffer, secret, iv) {
    const cipher = this.getCipher(secret, iv);
    let crypt = cipher.update(dataBuffer);
    crypt += cipher.final('binary');
    return Buffer.from(crypt, 'binary');
  }

  /**
   * Perform aes-256-cbc decryption on a data block
   *
   * @param {Buffer} dataBuffer
   * @param {Buffer|string} secret
   * @param {Buffer|string} iv
   * @return {Buffer} 
   * @memberof AESCrypt
   */
  dec(dataBuffer, secret, iv) {
    const decipher = this.getDecipher(secret, iv);
    let decrypt = decipher.update(dataBuffer);
    decrypt += decipher.final();

    return Buffer.from(decrypt);
  }

  /**
   * Chunks a buffer of data and encrypts each chunk and returns the combined buffer
   *
   * @param {Buffer} dataBuffer
   * @param {Buffer|string} secret
   * @param {Buffer|string} iv
   * @return {Buffer} 
   * @memberof AESCrypt
   */
  encData(dataBuffer, secret, iv) {
    const out = [];
    const chunks = this.getChunks(dataBuffer, 15);
    for (let itr = 0, jtr = chunks.length; itr < jtr; itr++) {
      out.push(this.enc(chunks[itr], secret, iv));
    }
    return Buffer.concat(out);
  }

  /**
   * Chunks a buffer of encrypted data and decrypts each chunk and returns the combined buffer
   *
   * @param {Buffer} dataBuffer
   * @param {Buffer|string} secret
   * @param {Buffer|string} iv
   * @return {Buffer} 
   * @memberof AESCrypt
   */
  decData(dataBuffer, secret, iv) {
    const out = [];
    const chunks = this.getChunks(dataBuffer, 16);
    for (let itr = 0, jtr = chunks.length; itr < jtr; itr++) {
      out.push(this.dec(chunks[itr], secret, iv));
    }

    return Buffer.concat(out);
  }

  /**
   * (Deprecated) Encrypts a value with the secret provided or the secret set on the instance
   *
   * @param {*} data
   * @param {*} secret
   * @return {*} 
   * @memberof AESCrypt
   * @deprecated Please used `encryptiv`
   */
  encrypt(data, secret) {
    return this.encryptiv(data, secret || this.secret, this.iv);
  }

  /**
   * Encrypts a value with the secret/iv provided or the secret/iv set on the instance
   *
   * @param {*} data
   * @param {*} secret
   * @param {*} iv
   * @return {*} 
   * @memberof AESCrypt
   */
  encryptiv(data, secret, iv) {
    secret = secret || this.secret;
    iv = iv || this.iv;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.encData(dataBuffer, secret, iv);
  }

  /**
   * (Deprecated) Decrypts a value with the secret provided or the secret set on the instance
   * 
   * @param {*} data
   * @param {*} secret
   * @return {*} 
   * @memberof AESCrypt
   * @deprecated Please use `decryptiv`
   */
  decrypt(data, secret) {
    return this.decryptiv(data, secret || this.secret, this.iv);
  }

  /**
   * Decrypts a value with the secret/iv provided or the secret/iv set on the instance*
   *
   * @param {*} data
   * @param {*} secret
   * @param {*} iv
   * @return {*} 
   * @memberof AESCrypt
   */
  decryptiv(data, secret, iv) {
    secret = secret || this.secret;
    iv = iv || this.iv;

    const dataBuffer = data instanceof Buffer ? data : Buffer.from(data);
    return this.decData(dataBuffer, secret, iv);
  }
}

module.exports = AESCrypt;
