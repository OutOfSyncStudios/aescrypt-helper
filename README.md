# aescrypt-helper

[![NPM](https://nodei.co/npm/@mediaxpost/aescrypt-helper.png?downloads=true)](https://nodei.co/npm/@mediaxpost/aescrypt-helper/)

[![Actual version published on npm](http://img.shields.io/npm/v/@mediaxpost/aescrypt-helper.svg)](https://www.npmjs.org/package/@mediaxpost/aescrypt-helper)
[![Travis build status](https://travis-ci.org/MediaXPost/aescrypt-helper.svg)](https://www.npmjs.org/package/@mediaxpost/aescrypt-helper)
[![Total npm module downloads](http://img.shields.io/npm/dt/@mediaxpost/aescrypt-helper.svg)](https://www.npmjs.org/package/@mediaxpost/aescrypt-helper)
[![Package Quality](http://npm.packagequality.com/badge/@mediaxpost/aescrypt-helper.png)](http://packagequality.com/#?package=@mediaxpost/aescrypt-helper)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5ccdf1cb900a4aa3985ced8a3c623fe4)](https://www.codacy.com/app/chronosis/aescrypt-helper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MediaXPost/aescrypt-helper&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage  Badge](https://api.codacy.com/project/badge/Coverage/5ccdf1cb900a4aa3985ced8a3c623fe4)](https://www.codacy.com/app/chronosis/aescrypt-helper?utm_source=github.com&utm_medium=referral&utm_content=MediaXPost/aescrypt-helper&utm_campaign=Badge_Coverage)
[![Dependencies badge](https://david-dm.org/MediaXPost/aescrypt-helper/status.svg)](https://david-dm.org/MediaXPost/aescrypt-helper?view=list)


`aescrypt-helper` is a set of simple tools to deal with the AES-256 encryption and decryption of data with arbitrary lengths.

# [Installation](#installation)
<a name="installation"></a>

```shell
npm install @mediaxpost/aescrypt-helper
```

# [Usage](#usage)
<a name="usage"></a>

```js
const AESCryptHelper = require('@mediaxpost/aescrypt-helper');

const secret = '41e8c08ff31f97547ac11cc47c29f8ce5cb187a70ef09226c0f025c25c55b5b3';
const iv = '3816d1474cf82f3182b83c390d3e8eb5';
const creds = { secret: null, iv: null };

creds.secret = Buffer.from(secret, 'hex');
creds.iv = Buffer.from(iv, 'hex');
const aescyptHelper = new AESCryptHelper(creds.secret, creds.iv);

console.log(aescryptHelper.decrypt(aescryptHelper.encrypt('Test Message')));
```

# [API Reference](#api)
<a name="api"></a>

## AESCryptHelper constructor(secret, iv[, separator]) ⇒ instanceof AESCryptHelper
Create an instance of AESCryptHelper using the `secret`, and `iv` (initialization vector).  Optionally, a block `separator` can be provided to determine how blocks of data are separated. For many implementations this is a new-line character, this library defaults to '$$$$'. The `secret`, `iv`, and the `separator` can be a string or a Buffer.

***Note***: The `iv` should be no more than 16-bytes in length and the `secret` should be no more than 32-bytes in length. When including a separator, it is recommended that non-base-64 characters are used.

## AESCryptHelper.encrypt(data [, secret]) ⇒ Buffer
Encrypt the `data` Buffer with the configured `secret` or the optionally passed `secret`. No `iv` is used for the encryption.  Returns the encrypted data in a Buffer.

## AESCryptHelper.encryptiv(data [, secret] [, iv]) ⇒ Buffer
Encrypt the `data` Buffer with the configured `secret` or the optionally passed `secret` and the configured `iv` or the optionally passed `iv`. Returns the encrypted data in a Buffer.

## AESCryptHelper.decrypt(encryptedData [, secret]) ⇒ Buffer
Decrypts the `encryptedData` Buffer with the configured `secret` or the optionally passed `secret`. No `iv` is used for the decryption.  Returns the decrypted data in a Buffer.

## AESCryptHelper.decryptiv(encryptedData [, secret] [, iv]) ⇒ Buffer
Decrypts the `encryptedData` Buffer with the configured `secret` or the optionally passed `secret` and the configured `iv` or the optionally passed `iv`. Returns the decrypted data in a Buffer.

# [License](#license)
<a name="license"></a>

Copyright (c) 2018 Jay Reardon -- Licensed under the MIT license.
