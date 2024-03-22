/**
 * This class provides methods for encrypting and decrypting messages using the AES-256-CTR encryption algorithm.
 * 
 * Methods:
 * 1. constructor(secretKey): Initializes the MessageCryptor object with a secret key for encryption.
 * 2. encrypt(message): Encrypts a message using the AES-256-CTR algorithm.
 * 3. decrypt(hash): Decrypts a previously encrypted message using the AES-256-CTR algorithm.
 */

const crypto = require('crypto');

class MessageCryptor {
    /**
     * Initializes the MessageCryptor object with a secret key for encryption.
     * @param {string|Buffer|TypedArray|DataView} secretKey - The secret key used for encryption.
     */
    constructor(secretKey) {
        // Define encryption algorithm
        this.algorithm = 'aes-256-ctr';
        // Generate secret key from input, ensuring it's 32 bytes long
        this.secretKey = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substring(0, 32);
        // Generate initialization vector (iv)
        this.iv = crypto.randomBytes(16);
    }

    /**
     * Encrypts a message using the AES-256-CTR algorithm.
     * @param {any} message - The message to be encrypted.
     * @returns {string} - The encrypted message as a hexadecimal string.
     */
    encrypt(message) {
        // Convert message to JSON string
        const text = JSON.stringify(message);
        // Generate initialization vector (iv)
        const iv = crypto.randomBytes(16);
        // Create cipher object using specified algorithm, secret key, and iv
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
        // Encrypt the message
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        // Return the iv concatenated with encrypted message as a hexadecimal string
        return iv.toString('hex') + encrypted.toString('hex');
    }

    /**
     * Decrypts a previously encrypted message using the AES-256-CTR algorithm.
     * @param {string} hash - The encrypted message as a hexadecimal string.
     * @returns {any} - The decrypted message.
     */
    decrypt(hash) {
        // Extract iv from the hash (first 32 characters)
        const iv = Buffer.from(hash.substring(0, 32), 'hex');
        // Extract encrypted text from the hash (remaining characters)
        const encryptedText = hash.substring(32);

        // Create decipher object using specified algorithm, secret key, and iv
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
        // Decrypt the message
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]).toString();

        // Parse the decrypted JSON string and return the message
        return JSON.parse(decrypted);
    }
}

module.exports = {
    MessageCryptor
};
