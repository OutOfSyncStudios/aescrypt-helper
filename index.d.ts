declare module "@outofsync/aescrypt-helper"

import { Cipher, Decipher } from 'crypto';

type BufferOrString = Buffer | string;

declare class AESCrypt {
  private algo: string;
  private secret: string;
  private iv: string;

  test(data: BufferOrString): boolean;
  testiv(data: BufferOrString): boolean;
  getChunks(data: BufferOrString, len: number): Buffer[];
  getCipher(secret: string, iv: string): Cipher;
  getDecipher(secret: string, iv: string): Decipher;
  enc(dataBuffer: Buffer, secret: string, iv: string): Buffer;
  dec(dataBuffer: Buffer, secret: string, iv: string): Buffer;
  encData(dataBuffer: Buffer, secret: string, iv: string): Buffer;
  decData(dataBuffer: Buffer, secret: string, iv: string): Buffer;
  encrypt(data: Buffer, secret: string): Buffer;
  encryptiv(data: Buffer, secret: string, iv: string): Buffer;
  decrypt(data: Buffer, secret: string): Buffer;
  decryptiv(data: Buffer, secret: string, iv: string): Buffer;
}