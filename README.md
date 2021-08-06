# aescrypt-helper

[![NPM](https://nodei.co/npm/@outofsync/aescrypt-helper.png?downloads=true)](https://nodei.co/npm/@outofsync/aescrypt-helper/)

[![Actual version published on npm](http://img.shields.io/npm/v/@outofsync/aescrypt-helper.svg)](https://www.npmjs.org/package/@outofsync/aescrypt-helper)
[![Total npm module downloads](http://img.shields.io/npm/dt/@outofsync/aescrypt-helper.svg)](https://www.npmjs.org/package/@outofsync/aescrypt-helper)
[![Master build](https://github.com/OutOfSyncStudios/aescrypt-helper/actions/workflows/build-master.yml/badge.svg)](https://github.com/OutOfSyncStudios/aescrypt-helper/actions/workflows/build-master.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/eebdf6aed1a14a3e9a44a017e4ac8ac2)](https://www.codacy.com/gh/OutOfSyncStudios/aescrypt-helper/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=OutOfSyncStudios/aescrypt-helper&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage Badge](https://app.codacy.com/project/badge/Coverage/eebdf6aed1a14a3e9a44a017e4ac8ac2)](https://www.codacy.com/gh/OutOfSyncStudios/aescrypt-helper/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=OutOfSyncStudios/aescrypt-helper&amp;utm_campaign=Badge_Coverage)
[![Dependencies badge](https://david-dm.org/gh/OutOfSyncStudios/aescrypt-helper.svg)](https://david-dm.org/OutOfSyncStudios/aescrypt-helper?view=list)


`aescrypt-helper` is a pure Node.js set of simple tools to deal with the AES-256-CBC encryption and decryption of data with arbitrary lengths.

# [Installation](#installation)
<a name="installation"></a>

```shell
npm install @outofsync/aescrypt-helper
```

# [Usage](#usage)
<a name="usage"></a>

```js
const AESCryptHelper = require('@outofsync/aescrypt-helper');

const secret = '41e8c08ff31f97547ac11cc47c29f8ce5cb187a70ef09226c0f025c25c55b5b3';
const iv = '3816d1474cf82f3182b83c390d3e8eb5';
const creds = { secret: null, iv: null };

creds.secret = Buffer.from(secret, 'hex');
creds.iv = Buffer.from(iv, 'hex');
const aescyptHelper = new AESCryptHelper(creds.secret, creds.iv);

console.log(aescryptHelper.decryptiv(aescryptHelper.encryptiv('Test Message')));
```

# [API Reference](#api)
<a name="api"></a>

## AESCryptHelper constructor(secret, iv[, separator]) &#x27fe; instanceof AESCryptHelper
Create an instance of AESCryptHelper using the `secret`, and `iv` (initialization vector).  A `separator`
may also be specified to indicate how blocks are separated; however, this is unnecessary and only included
for backwards compatibility. By default, no separator is used.

***Note***: The `iv` should exactly 16 bytes in length and the `secret` should be exactly 32 bytes in length.

## AESCryptHelper.encryptiv(data [, secret] [, iv]) &#x27fe; Buffer
Encrypt the `data` Buffer with the configured `secret` or the optionally passed `secret` and the configured `iv` or the optionally passed `iv`. Returns the encrypted data in a Buffer.

## AESCryptHelper.decryptiv(encryptedData [, secret] [, iv]) &#x27fe; Buffer
Decrypts the `encryptedData` Buffer with the configured `secret` or the optionally passed `secret` and the configured `iv` or the optionally passed `iv`. Returns the decrypted data in a Buffer.

# [License](#license)
<a name="license"></a>

Copyright (c) 2018-2021 Out of Sync Studios LLC -- Licensed under the MIT license.
