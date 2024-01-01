const crypto = require('crypto');

class MessageCryptor {
    constructor(secretKey) {
        this.algorithm = 'aes-256-ctr';
        this.secretKey = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substring(0, 32);
        this.iv = crypto.randomBytes(16);
    }

    encrypt(message) {
        const text = JSON.stringify(message);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return iv.toString('hex') + encrypted.toString('hex');
    }

    decrypt(hash) {
        const iv = Buffer.from(hash.substring(0, 32), 'hex');
        const encryptedText = hash.substring(32);

        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]).toString();

        return JSON.parse(decrypted);
    }
}

module.exports = {
    MessageCryptor
};
